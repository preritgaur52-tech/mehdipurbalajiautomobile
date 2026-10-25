import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, CheckCircle, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'nav' | 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'nav',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed, hide prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      await install();
      setIsInstalling(false);
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Generic browser guidance
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {variant === 'compact' ? (
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-slate-700 hover:text-blue-700 active:scale-95 transition-all ${className}`}
          title="Install App on Phone"
          aria-label="Install App"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <span>Install</span>
        </button>
      ) : variant === 'full' ? (
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-900/30 transition-all ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Install Mobile App (Instant 1-Tap)</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${className}`}
          title="Install HP Fuel Hub App"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      )}

      {/* Guided Installation Modal (for iOS Safari or non-automated browsers) */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-slate-900">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              aria-label="Close install modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                  Install HP Fuel Hub App
                </h3>
                <p className="text-[11px] text-slate-500">
                  Runs instantly offline on any phone
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 my-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </div>
                <div>
                  <span className="font-bold text-slate-900">Tap Browser Share / Menu:</span>
                  <p className="text-slate-500 mt-0.5 flex items-center gap-1">
                    Tap <Share2 className="w-3.5 h-3.5 text-blue-600 inline" /> at the bottom (Safari) or <span className="font-bold">⋮</span> top right (Chrome).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </div>
                <div>
                  <span className="font-bold text-slate-900">Select "Add to Home Screen":</span>
                  <p className="text-slate-500 mt-0.5 flex items-center gap-1">
                    Scroll down and choose <PlusSquare className="w-3.5 h-3.5 text-blue-600 inline" /> <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-emerald-800">Launch Anytime Offline</span>
                  <p className="text-slate-500 mt-0.5">
                    Fast access on highway without waiting for slow signals.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
