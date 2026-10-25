import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { getIntroVoiceScript, playWelcomeChime, sanitizeVoicePrompt } from '../utils/introAudio';

interface AutoVoiceIntroProps {
  onAudioStateChange?: (isPlaying: boolean) => void;
}

export const AutoVoiceIntro: React.FC<AutoVoiceIntroProps> = ({ onAudioStateChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<'gemini' | 'browser' | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  const hindiScript = getIntroVoiceScript('hi');

  // Trigger Hindi Voice Playback on Mount or First Interaction
  useEffect(() => {
    if (hasTriggeredRef.current) return;

    const startHindiVoice = async () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setHasStarted(true);
      await playHindiIntro();
    };

    // 1. Attempt immediate autoplay (works if user navigated or browser allows audio)
    startHindiVoice().catch(() => {
      // 2. If blocked by browser autoplay policy, attach one-time listener to user gesture
      const unlockAudio = () => {
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('scroll', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        playHindiIntro();
      };

      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('scroll', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    });

    return () => {
      stopPlayback();
    };
  }, []);

  useEffect(() => {
    onAudioStateChange?.(isPlaying);
  }, [isPlaying, onAudioStateChange]);

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const playBrowserSpeechFallback = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sanitizeVoicePrompt(text));
      synthRef.current = utterance;

      const voices = window.speechSynthesis.getVoices();
      const hiVoice = voices.find(
        (v) => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi')
      );
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsPlaying(true);
        setAudioSource('browser');
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlaying(false);
    }
  };

  const playHindiIntro = async () => {
    try {
      // Optional subtle ambient acoustic chime before voice
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          const chimeCtx = new AudioCtxClass();
          if (chimeCtx.state === 'suspended') {
            await chimeCtx.resume();
          }
          await playWelcomeChime(chimeCtx);
        }
      } catch {
        // Continue if chime fails
      }

      // Fetch pre-cached or Gemini TTS Hindi audio from server
      const res = await fetch('/api/intro-audio?lang=hi');
      if (!res.ok) throw new Error('TTS fetch failed');
      const data = await res.json();

      if (data.audioBase64) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        const audio = audioRef.current;
        audio.src = audioSrc;

        audio.onended = () => {
          setIsPlaying(false);
        };

        audio.onerror = () => {
          playBrowserSpeechFallback(data.text || hindiScript.text);
        };

        await audio.play();
        setIsPlaying(true);
        setAudioSource('gemini');
      } else {
        playBrowserSpeechFallback(data.text || hindiScript.text);
      }
    } catch {
      playBrowserSpeechFallback(hindiScript.text);
    }
  };

  const handleToggleMute = () => {
    if (isPlaying) {
      stopPlayback();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      playHindiIntro();
    }
  };

  // Pure automated playback with no pinned floating UI buttons on screen
  return null;
};
