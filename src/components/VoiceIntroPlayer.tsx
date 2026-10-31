import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export interface VoiceOverScripts {
  en: string;
  hi: string;
}

/**
 * Authoritative promotional voice-over scripts including the ending credit: '— [by Shashank Sharma]'
 */
export const VOICE_OVER_SCRIPTS: VoiceOverScripts = {
  en: 'Welcome to Mehdipur Balaji Automobile! Your trusted HP Fuel Hub on the Mathura-Hathras Highway. Pure diesel, petrol, DEF urea, and 24/7 highway service. Safe travels! — Owner: Shashank Sharma',
  hi: 'नमस्ते! मेंहदीपुर बालाजी ऑटोमोबाइल, एचपी फ्यूल हब में आपका हार्दिक स्वागत है। मथुरा-हाथरस हाईवे पर हमारी अत्याधुनिक पेट्रोल पंप पर आपको मिलता है शत-प्रतिशत शुद्ध व प्रमाणित हाई-स्पीड डीजल, पेट्रोल, पॉवर 95, और बीएस-6 वाहनों के लिए ओरिजिनल डीईएफ यूरिया। साथ ही मुफ़्त डिजिटल एयर, नाइट्रोजन, और 24 घंटे साफ़-सुथरे वॉशरूम की उत्तम सुविधा। आपकी हर यात्रा हो सुखद और सुरक्षित। धन्यवाद! ऑनर: शशांक शर्मा।',
};

interface AutoVoiceIntroProps {
  lang?: 'en' | 'hi';
  onAudioStateChange?: (isPlaying: boolean) => void;
}

/**
 * AutoVoiceIntro - Universal Welcome Voice Player
 * Automatically plays the station welcome voice intro in Hindi on Chrome,
 * mobile browsers, tablets, and installed PWA/App directly upon opening.
 * Provides a floating status badge so the user can visually confirm playback or replay at any time.
 */
export const AutoVoiceIntro: React.FC<AutoVoiceIntroProps> = ({ lang = 'hi', onAudioStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as any;

    const updateState = (playing: boolean) => {
      setIsPlaying(playing);
      onAudioStateChange?.(playing);
    };

    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      updateState(!!customEvent.detail?.isPlaying);
    };

    window.addEventListener('station-audio-state', handleStateChange);

    // Initial check
    if (typeof win.isStationIntroPlaying === 'function') {
      setIsPlaying(win.isStationIntroPlaying());
    }

    // Trigger immediate playback on mount
    if (typeof win.playStationIntro === 'function') {
      win.playStationIntro().catch(() => {});
    }

    return () => {
      window.removeEventListener('station-audio-state', handleStateChange);
    };
  }, [lang, onAudioStateChange]);

  const togglePlayback = () => {
    const win = window as any;
    if (isPlaying) {
      if (typeof win.pauseStationIntro === 'function') {
        win.pauseStationIntro();
      }
    } else {
      if (typeof win.playStationIntro === 'function') {
        win.playStationIntro();
      }
    }
  };

  // Pure automated background playback - zero external UI buttons
  return null;
};

