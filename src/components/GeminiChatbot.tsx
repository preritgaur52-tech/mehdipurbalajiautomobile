import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Globe,
  ExternalLink,
  Radio,
  RotateCcw,
  Bot,
  User,
  ChevronDown,
  Navigation,
  Phone,
  Fuel,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: { title: string; uri: string }[];
  audioBase64?: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'Current fuel & DEF urea rates today?',
  'Calculate fuel & DEF for 250 km trip',
  'Washroom and tire air facilities?',
  'Directions from Mathura or Yamuna Expressway?',
  'Search live highway traffic near Hathras',
];

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Namaste! Welcome to **Mehdipur Balaji Automobile (HP Fuel Hub)**. I am your Gemini-powered Highway Co-Pilot with live Google Search data.\n\nAsk me about today\'s fuel rates, highway routing, DEF urea requirements, clean amenities, or start a **real-time voice conversation**!',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isLiveVoiceActive, setIsLiveVoiceActive] = useState(false);
  const [liveVoiceStatus, setLiveVoiceStatus] = useState<string>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const liveWsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up audio & live sessions on unmount
  useEffect(() => {
    return () => {
      stopLiveVoice();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text || 'I am ready to assist your journey at Mehdipur Balaji Automobile HP Fuel Hub.',
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMessage]);

      // Automatically play TTS if user is interacting with voice or requested
      if (isLiveVoiceActive) {
        playTTS(modelMessage.id, modelMessage.text);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: 'Sorry, I had trouble reaching our search assistant. For immediate help, call our station manager directly at **+91 79061 03090**.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Text to Speech playback using gemini-3.8-flash-lite-tts
  const playTTS = async (messageId: string, text: string) => {
    if (isSpeakingId === messageId && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsSpeakingId(null);
      return;
    }

    try {
      setIsSpeakingId(messageId);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'Kore' }),
      });

      if (!res.ok) throw new Error('TTS failed');
      const data = await res.json();

      if (data.audioBase64) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        if (!audioPlayerRef.current) {
          audioPlayerRef.current = new Audio();
        }
        audioPlayerRef.current.src = audioSrc;
        audioPlayerRef.current.onended = () => setIsSpeakingId(null);
        audioPlayerRef.current.onerror = () => setIsSpeakingId(null);
        await audioPlayerRef.current.play();
      } else {
        setIsSpeakingId(null);
      }
    } catch (err) {
      console.error('TTS playback error:', err);
      // Fallback to browser Web Speech Synthesis if backend TTS is unavailable
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 250));
        utterance.onend = () => setIsSpeakingId(null);
        utterance.onerror = () => setIsSpeakingId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeakingId(null);
      }
    }
  };

  // Browser Speech-to-Text Microphone Dictation
  const handleMicInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setLiveVoiceStatus('listening');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSendMessage(transcript);
      setLiveVoiceStatus('idle');
    };

    recognition.onerror = () => {
      setLiveVoiceStatus('idle');
    };

    recognition.onend = () => {
      setLiveVoiceStatus('idle');
    };

    recognition.start();
  };

  // Gemini Live Voice API (Real-Time Audio Session via WebSocket)
  const startLiveVoice = async () => {
    try {
      setLiveVoiceStatus('connecting');
      setIsLiveVoiceActive(true);

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      liveWsRef.current = ws;

      ws.onopen = async () => {
        setLiveVoiceStatus('live');
        // Initialize AudioContext & Microphone stream at 16kHz
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
            sampleRate: 16000,
          });
          audioContextRef.current = audioCtx;

          const source = audioCtx.createMediaStreamSource(stream);
          const processor = audioCtx.createScriptProcessor(4096, 1, 1);
          source.connect(processor);
          processor.connect(audioCtx.destination);

          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to 16-bit PCM
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                const s = Math.max(-1, Math.min(1, inputData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
              }
              // Base64 encode
              const binary = String.fromCharCode(...new Uint8Array(pcm16.buffer));
              const base64Audio = btoa(binary);
              ws.send(JSON.stringify({ audio: base64Audio }));
            }
          };
        } catch (micErr) {
          console.error('Mic access error:', micErr);
          setLiveVoiceStatus('mic_denied');
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            // Play received 24kHz audio chunk from Gemini Live
            playRawPcm(data.audio);
          }
          if (data.error) {
            console.error('Gemini Live error:', data.error);
          }
        } catch (e) {
          console.error('Error parsing live message:', e);
        }
      };

      ws.onclose = () => {
        setLiveVoiceStatus('idle');
        setIsLiveVoiceActive(false);
      };
    } catch (err) {
      console.error('Failed to start Live Voice:', err);
      setLiveVoiceStatus('idle');
      setIsLiveVoiceActive(false);
    }
  };

  const stopLiveVoice = () => {
    if (liveWsRef.current) {
      liveWsRef.current.close();
      liveWsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsLiveVoiceActive(false);
    setLiveVoiceStatus('idle');
  };

  const playRawPcm = (base64Audio: string) => {
    try {
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      const audioBuffer = outputCtx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = outputCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputCtx.destination);
      source.start(0);
    } catch (e) {
      console.error('Failed to play raw PCM:', e);
    }
  };

  return (
    <>
      {/* Floating Co-Pilot Chat Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/95 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">Ask Gemini Co-Pilot with Google Search</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center transition-all hover:scale-105 group border border-white/20"
          aria-label="Open Gemini AI Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Slide-over / Popup Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 left-2 sm:left-auto z-50 sm:w-[440px] max-h-[80vh] h-[580px] sm:h-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/40 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    HP Highway Co-Pilot
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Gemini 3.8 + Search
                  </span>
                </div>
                <p className="text-[11px] text-blue-200">
                  Mehdipur Balaji Automobile Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice Conversation Mode Toggle */}
              <button
                onClick={isLiveVoiceActive ? stopLiveVoice : startLiveVoice}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  isLiveVoiceActive
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-blue-200'
                }`}
                title="Start real-time voice conversation (Gemini Live API)"
              >
                <Radio className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isLiveVoiceActive ? 'Live Audio' : 'Voice Mode'}
                </span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Minimize Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live Voice Active Overlay Banner */}
          {isLiveVoiceActive && (
            <div className="bg-blue-900 text-blue-100 px-4 py-2 text-xs flex items-center justify-between border-b border-blue-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>
                <span className="font-bold">Gemini Live Voice Active</span>
                <span className="text-[11px] text-blue-300">(Speak freely through your mic)</span>
              </div>
              <button
                onClick={stopLiveVoice}
                className="text-[11px] font-bold text-red-300 hover:text-white underline"
              >
                End Voice
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-blue-700 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {/* Message Text with simple linebreaks */}
                  <div className="whitespace-pre-wrap">{m.text}</div>

                  {/* Google Search Grounding Sources */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Google Search Grounding Sources:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.slice(0, 4).map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[10px] text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors truncate max-w-[200px]"
                            title={source.title}
                          >
                            <span className="truncate">{source.title}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audio Read-Out Button */}
                  {m.role === 'model' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => playTTS(m.id, m.text)}
                        className={`flex items-center gap-1 font-semibold text-xs px-2 py-0.5 rounded transition-colors ${
                          isSpeakingId === m.id
                            ? 'text-blue-700 bg-blue-50 font-bold'
                            : 'text-slate-500 hover:text-blue-700'
                        }`}
                        title="Listen to this response aloud"
                      >
                        {isSpeakingId === m.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                            <span>Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 shadow-sm text-xs text-slate-500 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                  <span>Searching Google & consulting forecourt data...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Buttons */}
          <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 shrink-0 no-scrollbar">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors border border-slate-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box & Mic Controls */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Dictation */}
              <button
                type="button"
                onClick={handleMicInput}
                className={`p-2.5 rounded-xl border transition-colors ${
                  liveVoiceStatus === 'listening'
                    ? 'bg-red-500 text-white border-red-600 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Speak to dictate in English or Hindi"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask fuel rates, route, urea, washrooms..."
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-blue-700 rounded-xl shadow-md transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-1.5">
              Powered by Google Gemini 3.8 Flash with live Google Search Grounding.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
