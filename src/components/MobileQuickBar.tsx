import React from 'react';
import { Phone, Navigation, Calculator, Sparkles, Fuel, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallButton } from './PWAInstallButton';

interface MobileQuickBarProps {
  onOpenCalculator: () => void;
  onOpenCopilot: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenCalculator,
  onOpenCopilot,
}) => {
  const { isInstalled } = usePWAInstall();

  return (
    <aside 
      aria-label="Mobile Quick Highway Bar"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-2xl transition-all"
    >
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto text-[10px] font-bold text-slate-300">
        {/* Action 1: Call Desk */}
        <a
          href="tel:+917906103090"
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-slate-800 text-slate-300 active:text-emerald-400 active:scale-95 transition-all"
          title="Call station desk 24x7"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="truncate">Call Desk</span>
        </a>

        {/* Action 2: GPS Directions */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-slate-800 text-slate-300 active:text-blue-400 active:scale-95 transition-all"
          title="Open in Google Maps"
        >
          <div className="w-8 h-8 rounded-full bg-blue-950/80 border border-blue-700/80 text-blue-400 flex items-center justify-center mb-0.5">
            <Navigation className="w-4 h-4" />
          </div>
          <span className="truncate">Maps</span>
        </a>

        {/* Action 3: Live Rates / Quick Calculator */}
        <button
          type="button"
          onClick={() => {
            const ratesEl = document.getElementById('rates');
            if (ratesEl) {
              ratesEl.scrollIntoView({ behavior: 'smooth' });
            } else {
              onOpenCalculator();
            }
          }}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-slate-800 text-slate-300 active:text-amber-400 active:scale-95 transition-all"
          title="Fuel Rates & Calculator"
        >
          <div className="w-8 h-8 rounded-full bg-amber-950/80 border border-amber-700/80 text-amber-400 flex items-center justify-center mb-0.5">
            <Fuel className="w-4 h-4" />
          </div>
          <span className="truncate">Rates</span>
        </button>

        {/* Action 4: Highway Calculator Modal */}
        <button
          type="button"
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-slate-800 text-slate-300 active:text-cyan-400 active:scale-95 transition-all"
          title="Open Highway Calculator"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-700/80 text-cyan-400 flex items-center justify-center mb-0.5">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="truncate">Calc</span>
        </button>

        {/* Action 5: Gemini AI Co-Pilot or Install */}
        {!isInstalled ? (
          <div className="flex flex-col items-center justify-center">
            <PWAInstallButton variant="compact" className="text-white hover:text-white" />
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCopilot}
            className="flex flex-col items-center justify-center py-1 rounded-xl hover:bg-slate-800 text-blue-400 active:scale-95 transition-all"
            title="Open Gemini AI Highway Assistant"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-0.5 shadow-md shadow-blue-900/50">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="truncate">AI Co-Pilot</span>
          </button>
        )}
      </div>
    </aside>
  );
};
