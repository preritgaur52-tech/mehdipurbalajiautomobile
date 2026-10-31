export interface IntroVoiceConfig {
  lang: 'en' | 'hi';
  text: string;
  voiceName: string;
  styleDescription: string;
}

export const INTRO_VOICE_SCRIPTS: Record<'en' | 'hi', IntroVoiceConfig> = {
  en: {
    lang: 'en',
    text: 'Welcome to Mehdipur Balaji Automobile! Your trusted HP Fuel Hub on the Mathura-Hathras Highway. Pure diesel, petrol, DEF urea, and 24/7 highway service. Safe travels! — Owner: Shashank Sharma',
    voiceName: 'Aoede',
    styleDescription: 'Warm, engaging, professional, hospitable and clear greeting to highway travelers',
  },
  hi: {
    lang: 'hi',
    text: 'नमस्ते! मेंहदीपुर बालाजी ऑटोमोबाइल, एचपी फ्यूल हब में आपका हार्दिक स्वागत है। मथुरा-हाथरस हाईवे पर हमारी अत्याधुनिक पेट्रोल पंप पर आपको मिलता है शत-प्रतिशत शुद्ध व प्रमाणित हाई-स्पीड डीजल, पेट्रोल, पॉवर 95, और बीएस-6 वाहनों के लिए ओरिजिनल डीईएफ यूरिया। साथ ही मुफ़्त डिजिटल एयर, नाइट्रोजन, और 24 घंटे साफ़-सुथरे वॉशरूम की उत्तम सुविधा। आपकी हर यात्रा हो सुखद और सुरक्षित। धन्यवाद! ऑनर: शशांक शर्मा।',
    voiceName: 'Aoede',
    styleDescription: 'Warm, welcoming, confident, professional Indian female voice (Broadcast quality, loud and clear, 14 LUFS)',
  },
};

/**
 * Returns the exact intro voice greeting script based on selected language
 */
export function getIntroVoiceScript(lang: 'en' | 'hi' = 'en'): IntroVoiceConfig {
  return INTRO_VOICE_SCRIPTS[lang] || INTRO_VOICE_SCRIPTS.en;
}

/**
 * Sanitizes voice announcement text for clean SpeechSynthesis or TTS processing
 */
export function sanitizeVoicePrompt(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(/[*_#`[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates an audio chime chord using the Web Audio API for sonic branding
 */
export function playWelcomeChime(audioCtx: AudioContext): Promise<void> {
  return new Promise((resolve) => {
    try {
      const now = audioCtx.currentTime;
      // High-grade acoustic chime frequencies (E5: 659.25Hz, G#5: 830.61Hz, B5: 987.77Hz)
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.5 }, // C5
        { freq: 659.25, time: 0.12, dur: 0.6 }, // E5
        { freq: 783.99, time: 0.24, dur: 0.8 }, // G5
        { freq: 1046.5, time: 0.36, dur: 1.0 }, // C6
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        // Gentle envelope: soft attack, exponential decay
        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.18, now + time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });

      setTimeout(resolve, 600);
    } catch {
      resolve();
    }
  });
}
