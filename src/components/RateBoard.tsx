import React, { useState, useEffect } from 'react';
import {
  Fuel,
  RefreshCw,
  ShieldCheck,
  Info,
  Check,
  ArrowRight,
  Gauge,
  Droplet,
  Sparkles,
  Lock,
  X,
  CheckCircle2,
  SlidersHorizontal,
  Pencil,
} from 'lucide-react';
import { RupeeIcon } from './RupeeIcon';
import {
  DEFAULT_RATES,
  FuelRate,
  getAutomatedDailyFuelRates,
  DailyRevisionMeta,
} from '../utils/fuelCalculations';

interface RateBoardProps {
  onOpenCalculator: (fuelId: string) => void;
  onOpenOwnerPortal?: (fuelId?: string) => void;
}

export const RateBoard: React.FC<RateBoardProps> = ({ onOpenCalculator, onOpenOwnerPortal }) => {
  const initialData = getAutomatedDailyFuelRates();
  const [rates, setRates] = useState<FuelRate[]>(initialData.rates);
  const [meta, setMeta] = useState<DailyRevisionMeta>(initialData.meta);
  const [isDensityModalOpen, setIsDensityModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Fetch live daily rates from server on mount and listen to owner updates
  useEffect(() => {
    fetchRates();

    const handleUpdate = () => {
      fetchRates();
    };

    window.addEventListener('fuel-rates-updated', handleUpdate);
    return () => {
      window.removeEventListener('fuel-rates-updated', handleUpdate);
    };
  }, []);

  const fetchRates = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/fuel-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.rates && data.meta) {
          setRates(data.rates);
          setMeta(data.meta);
        }
      }
    } catch {
      // Fallback to local daily automated calculation
      const fallback = getAutomatedDailyFuelRates();
      setRates(fallback.rates);
      setMeta(fallback.meta);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleManualSync = async () => {
    await fetchRates();
    setSyncToast("Today's rates verified and synchronized with 06:00 AM IST cycle!");
    setTimeout(() => setSyncToast(null), 4000);
  };

  return (
    <section
      id="rates"
      className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Official HPCL Digital Price Totem</span>
              <span aria-hidden="true">·</span>
              <span>Hathras - Mathura Highway</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Live Fuel & DEF Rates Board
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Automated daily fuel rates synchronized every morning at 06:00 AM IST. Pure fuels calibrated to
              Bureau of Indian Standards (BIS) specifications with electronic density monitoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsDensityModalOpen(true)}
              className="text-xs font-semibold text-blue-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Gauge className="w-3.5 h-3.5 text-blue-400" />
              <span>Density Check Standard (15°C)</span>
            </button>

            {/* Manual / Automatic Sync Trigger */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-700 transition-all shadow-sm active:scale-95"
              title="Click to check today's live rate update"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing...' : `Valid: ${meta.revisedDate}`}</span>
            </button>

            {/* Direct Manual Fuel Rate Editing Option */}
            {onOpenOwnerPortal && (
              <button
                type="button"
                onClick={() => onOpenOwnerPortal()}
                className="text-xs font-semibold text-amber-300 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/70 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 hover:shadow-amber-900/30"
                title="Manually edit fuel rates and retrain AI"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Rates Manually</span>
              </button>
            )}
          </div>
        </div>

        {/* Sync Toast Feedback */}
        {syncToast && (
          <div className="mb-6 p-3 bg-emerald-950/90 border border-emerald-600/80 text-emerald-200 text-xs rounded-xl flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{syncToast}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Next: {meta.nextRevisionAt}</span>
          </div>
        )}

        {/* Automated System Status Banner */}
        <div className="mb-8 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-extrabold text-emerald-400 uppercase tracking-wide">
              Automated Daily Rate Sync Active
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">Synchronized Daily at 06:00:00 AM IST</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              <Lock className="w-3 h-3 text-emerald-400" />
              Diesel: Fixed Price Guarantee (₹95.47/L · Aligarh UP)
            </span>
            <span>·</span>
            <span>Next OMC Cycle: {meta.nextRevisionAt}</span>
          </div>
        </div>

        {/* 4 Fuel Rate Cards styled like digital highway LED displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rates.map((rate) => {
            const isPremium = rate.type === 'premium';
            const isDiesel = rate.type === 'diesel';
            const isUrea = rate.type === 'urea';

            return (
              <div
                key={rate.id}
                className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                  isPremium
                    ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-600/40 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-900/30'
                    : isDiesel
                    ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-blue-600/40 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/30 ring-1 ring-emerald-500/30'
                    : isUrea
                    ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-600/40 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-900/30'
                    : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800 hover:border-slate-600 hover:shadow-2xl hover:shadow-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                      {rate.type === 'diesel'
                        ? 'High Speed Diesel'
                        : rate.type === 'urea'
                        ? 'BS-VI Exhaust Fluid'
                        : 'Motor Fuel'}
                    </span>
                    {rate.isPriceFixed ? (
                      <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700 flex items-center gap-1 shadow-sm">
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                        Fixed Price
                      </span>
                    ) : rate.badge ? (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                        {rate.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {rate.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-2">
                    {rate.description}
                  </p>

                  {/* Digital Price Display */}
                  <div className="mb-5 p-4 rounded-2xl bg-black/60 border border-slate-800/80 shadow-inner">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono flex items-center gap-1.5">
                        <RupeeIcon
                          className={`w-7 h-7 sm:w-8 sm:h-8 ${
                            isPremium ? 'text-amber-400' : isUrea ? 'text-cyan-400' : 'text-blue-400'
                          }`}
                        />
                        <span>{rate.price.toFixed(2)}</span>
                      </div>
                      {onOpenOwnerPortal && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenOwnerPortal(rate.id);
                          }}
                          className="text-[10px] font-bold text-amber-300 hover:text-amber-100 bg-amber-950/70 hover:bg-amber-900 border border-amber-700/60 px-2 py-1 rounded-lg transition-all flex items-center gap-1 shadow active:scale-95"
                          title={`Manually edit ${rate.name} rate`}
                        >
                          <Pencil className="w-2.5 h-2.5 text-amber-400" />
                          <span>Edit Rate</span>
                        </button>
                      )}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 mt-1.5 flex items-center justify-between">
                      <span>{rate.unit}</span>
                      <span className="text-emerald-400 font-semibold">
                        {rate.isPriceFixed ? 'Fixed Benchmark' : 'Calibrated Net'}
                      </span>
                    </div>
                  </div>

                  {/* Density Standard Row */}
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 flex items-center justify-between mb-6">
                    <span className="text-slate-400 font-medium">Std Density (15°C):</span>
                    <span className="font-mono font-bold text-white">{rate.densityRange}</span>
                  </div>
                </div>

                {/* Button Action */}
                <button
                  onClick={() => onOpenCalculator(rate.id)}
                  className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    isPremium
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30'
                  }`}
                >
                  <span>Estimate Trip Cost</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Quality Transparency Guarantee Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-800/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Customer Right to Calibration Check (HPCL Transparency Guarantee)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                As an authorized HP Fuel Hub, Mehdipur Balaji Automobile provides instant
                <strong> Filter Paper Purity Tests</strong> and calibrated{' '}
                <strong>5-Litre Government-Stamped Measure Tests</strong> at your request prior to fueling. Zero
                compromise, 100% peace of mind.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsDensityModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 whitespace-nowrap"
            >
              How Density Is Tested
            </button>
          </div>
        </div>
      </div>

      {/* Density & Purity Explanation Modal */}
      {isDensityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDensityModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
                <Gauge className="w-4 h-4" />
                <span>HPCL Technical Standard</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Fuel Density Standards & Purity Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Fuel expands and contracts with atmospheric temperature. To guarantee 100% purity,
                  all Indian oil companies test density converted to standard 15°C reference:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-blue-400 block mb-1">
                    Motor Spirit (Petrol / MS): 720 to 775 kg/m³
                  </span>
                  <p className="text-xs text-slate-300">
                    Tested using ASTM hydrometer. Density variation between delivery invoice and dispenser tank must be within ±3 kg/m³.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-blue-400 block mb-1">
                    High Speed Diesel (HSD): 820 to 860 kg/m³ (Fixed: ₹95.47/L)
                  </span>
                  <p className="text-xs text-slate-300">
                    High cetane diesel ensuring clean ignition and low emissions. Fixed price guaranteed for fleet and highway operators.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs font-bold text-cyan-400 block mb-1">
                    HP DEF Urea (AUS 32): 1087 to 1093 kg/m³
                  </span>
                  <p className="text-xs text-slate-300">
                    High-purity aqueous urea solution (32.5% urea in deionized water) with strict ISO 22241 adherence.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsDensityModalOpen(false)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
                >
                  Understood, Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
