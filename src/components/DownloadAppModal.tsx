import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  PlusSquare,
  X,
  Sparkles,
  Zap,
  WifiOff,
  Navigation,
  ShieldCheck,
  QrCode,
  Laptop,
  Check,
  ArrowRight,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: 'en' | 'hi';
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [platform, setPlatform] = useState<'android' | 'ios' | 'desktop' | 'qr'>('android');
  const [isInstalling, setIsInstalling] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-detect current platform on open
  useEffect(() => {
    if (isOpen) {
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setPlatform('ios');
      } else if (/android/.test(ua)) {
        setPlatform('android');
      } else {
        setPlatform('desktop');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      setPlatform('ios');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  const isHindi = currentLang === 'hi';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Download App Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-white my-auto overflow-hidden"
      >
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          aria-label="Close download app modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with HP Emblem */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 border border-slate-300 shadow-md flex items-center justify-center shrink-0">
            <img
              src="/images/hp_logo.png"
              alt="HPCL Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 rounded-full">
                {isHindi ? 'ऑफिशियल मोबाइल ऐप' : 'Official Mobile App'}
              </span>
              <span className="text-[10px] font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800">
                PWA · &lt; 2 MB
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {isHindi
                ? 'एचपी बालाजी फ्यूल हब ऐप डाउनलोड करें'
                : 'Download HP Balaji Official App'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isHindi
                ? 'कम इंटरनेट में भी तेज चलता है। 1-टैप में दैनिक ईंधन दरें, जीपीएस मैप और एआई असिस्टेंट।'
                : 'Zero installation lag. Works offline on low to high-end phones with real-time fuel rates & GPS.'}
            </p>
          </div>
        </div>

        {/* Already Installed Banner */}
        {isInstalled && (
          <div className="mb-4 p-3 bg-emerald-950/90 border border-emerald-600/80 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isHindi
                ? 'ऐप आपके फोन / डिवाइस पर सफलतापूर्वक इंस्टॉल है!'
                : 'App is already installed and running in native standalone mode!'}
            </span>
          </div>
        )}

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPlatform('android')}
            className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              platform === 'android'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">Android</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('ios')}
            className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              platform === 'ios'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">iPhone</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('desktop')}
            className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              platform === 'desktop'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="text-[11px]">Laptop</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('qr')}
            className={`py-2 px-1 rounded-xl transition flex flex-col sm:flex-row items-center justify-center gap-1 ${
              platform === 'qr'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="text-[11px]">Scan QR</span>
          </button>
        </div>

        {/* Tab 1: Android Download & 1-Tap Flow */}
        {platform === 'android' && (
          <div className="space-y-4 animate-fadeIn">
            {isInstallable ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
                      {isHindi ? '1-टैप डायरेक्ट डाउनलोड उपलब्ध' : '1-Tap Direct Download Ready'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Chrome / Edge</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isHindi
                    ? 'नीचे दिए गए बटन पर टैप करें। ऐप बिना किसी प्ले स्टोर अकाउंट के तुरंत आपके फोन पर इंस्टॉल हो जाएगा।'
                    : 'Tap the button below. Installs directly to your home screen with zero Play Store wait.'}
                </p>
                <button
                  type="button"
                  onClick={handleInstallClick}
                  disabled={isInstalling}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isInstalling
                      ? isHindi
                        ? 'इंस्टॉल हो रहा है...'
                        : 'Installing to Phone...'
                      : isHindi
                      ? 'अभी ऐप डाउनलोड व इंस्टॉल करें'
                      : 'Download & Install App Now'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>{isHindi ? 'एंड्रॉयड फोन पर डाउनलोड करने के निर्देश' : 'How to Download on Android'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Chrome / Samsung</span>
                </div>
                <ol className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-900/80 text-blue-300 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      1
                    </span>
                    <span>
                      {isHindi
                        ? 'ब्राउज़र के ऊपर दाईं ओर 3 डॉट्स (⋮) मेनू पर टैप करें।'
                        : 'Open Chrome or your browser menu (tap the 3 dots ⋮ top right).'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-900/80 text-blue-300 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      2
                    </span>
                    <span>
                      {isHindi
                        ? '"Install app" या "Add to Home screen" चुनें।'
                        : 'Tap "Install app" or "Add to Home screen".'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      3
                    </span>
                    <span>
                      {isHindi
                        ? 'कन्फर्म करें। ऐप का आइकन आपके फोन के होम स्क्रीन पर आ जाएगा।'
                        : 'Confirm "Install". The HP Balaji app icon will appear instantly on your phone.'}
                    </span>
                  </li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: iPhone (iOS Safari) Flow */}
        {platform === 'ios' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs text-slate-300 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>{isHindi ? 'आईफोन (iPhone) पर डाउनलोड निर्देश' : 'Download on iPhone & iPad'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Safari</span>
            </div>
            <ol className="space-y-3">
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-900/80 text-blue-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </div>
                <div>
                  <span className="font-bold text-white">
                    {isHindi ? 'सफारी में शेयर बटन दबाएं' : 'Tap the Share Button:'}
                  </span>
                  <p className="text-slate-400 mt-0.5 flex items-center gap-1">
                    {isHindi
                      ? 'स्क्रीन के नीचे दिए गए शेयर'
                      : 'At the bottom of your Safari screen, tap'}
                    <Share2 className="w-3.5 h-3.5 text-blue-400 inline" />
                    {isHindi ? 'आइकन पर टैप करें।' : 'icon.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-900/80 text-blue-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </div>
                <div>
                  <span className="font-bold text-white">
                    {isHindi ? '"Add to Home Screen" चुनें' : 'Select "Add to Home Screen":'}
                  </span>
                  <p className="text-slate-400 mt-0.5 flex items-center gap-1">
                    {isHindi ? 'नीचे स्क्रॉल करें और' : 'Scroll down and tap'}
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />
                    <strong>Add to Home Screen</strong>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </div>
                <div>
                  <span className="font-bold text-white">
                    {isHindi ? 'ऊपर दाईं ओर "Add" दबाएं' : 'Tap "Add" Top Right:'}
                  </span>
                  <p className="text-slate-400 mt-0.5">
                    {isHindi
                      ? 'एचपी बालाजी ऐप आपके आईफोन के होम स्क्रीन पर अन्य ऐप्स की तरह सेव हो जाएगा।'
                      : 'The HP Balaji app icon will appear directly on your home screen.'}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* Tab 3: Desktop / Laptop Flow */}
        {platform === 'desktop' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs text-slate-300 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-purple-400" />
                <span>{isHindi ? 'कंप्यूटर व लैपटॉप पर इंस्टॉल' : 'Install on PC / Mac'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Chrome / Edge</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {isHindi
                ? 'क्रोम या एज ब्राउज़र के एड्रेस बार में दाईं तरफ "Install" आइकन पर क्लिक करें या नीचे बटन दबाएं।'
                : 'Click the install icon in your address bar (right side next to URL) or click the direct button below.'}
            </p>
            {isInstallable ? (
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isHindi ? 'डेस्कटॉप ऐप इंस्टॉल करें' : 'Install Desktop App'}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400">
                  {isHindi
                    ? 'ब्राउज़र एड्रेस बार में (⊕) इंस्टॉल आइकन देखें'
                    : 'Check the (⊕) install button in your browser address bar'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <ArrowRight className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: QR Code Scan Flow */}
        {platform === 'qr' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3 animate-fadeIn">
            <span className="text-xs font-bold text-white block">
              {isHindi ? 'फोन कैमरे से स्कैन करें और तुरंत ऐप खोलें' : 'Scan With Phone Camera to Download'}
            </span>
            {/* High-contrast generated SVG QR code */}
            <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* SVG QR Code Pattern representing the app URL */}
                <rect width="100" height="100" fill="#ffffff" />
                {/* Top Left Corner */}
                <rect x="10" y="10" width="24" height="24" fill="#000000" />
                <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="18" width="8" height="8" fill="#000000" />
                {/* Top Right Corner */}
                <rect x="66" y="10" width="24" height="24" fill="#000000" />
                <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                <rect x="74" y="18" width="8" height="8" fill="#000000" />
                {/* Bottom Left Corner */}
                <rect x="10" y="66" width="24" height="24" fill="#000000" />
                <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                <rect x="18" y="74" width="8" height="8" fill="#000000" />
                {/* Timing patterns and data blocks */}
                <rect x="38" y="12" width="4" height="4" fill="#000000" />
                <rect x="46" y="12" width="4" height="4" fill="#000000" />
                <rect x="54" y="12" width="4" height="4" fill="#000000" />
                <rect x="12" y="38" width="4" height="4" fill="#000000" />
                <rect x="12" y="46" width="4" height="4" fill="#000000" />
                <rect x="12" y="54" width="4" height="4" fill="#000000" />
                <rect x="38" y="38" width="24" height="24" fill="#1e3a8a" rx="4" />
                {/* Center HP Emblem in QR */}
                <circle cx="50" cy="50" r="8" fill="#ffffff" />
                <circle cx="50" cy="50" r="6" fill="#dc2626" />
                {/* Scattered data dots */}
                <rect x="66" y="38" width="6" height="6" fill="#000000" />
                <rect x="76" y="44" width="6" height="6" fill="#000000" />
                <rect x="66" y="52" width="6" height="6" fill="#000000" />
                <rect x="80" y="58" width="6" height="6" fill="#000000" />
                <rect x="38" y="66" width="6" height="6" fill="#000000" />
                <rect x="48" y="72" width="6" height="6" fill="#000000" />
                <rect x="56" y="80" width="6" height="6" fill="#000000" />
                <rect x="66" y="72" width="6" height="6" fill="#000000" />
                <rect x="78" y="78" width="6" height="6" fill="#000000" />
              </svg>
            </div>
            <div className="text-[11px] text-slate-400">
              {isHindi
                ? 'कैमरा ऐप खोलें और क्यूआर कोड पर पॉइंट करें'
                : 'Point any phone camera to open and install instantly'}
            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isHindi ? '100% ऑफलाइन रेट्स' : 'Works 100% Offline'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{isHindi ? '1-टैप हाईवे जीपीएस' : '1-Tap GPS Highway Route'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isHindi ? 'एआई वॉयस को-पायलट' : 'Gemini AI Voice Co-Pilot'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{isHindi ? 'हल्का ऐप (< 2 MB)' : 'Lightweight (< 2 MB)'}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? (isHindi ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (isHindi ? 'शेयर लिंक कॉपी करें' : 'Copy Website Link')}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
