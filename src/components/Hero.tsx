import React, { useState, useEffect } from 'react';
import {
  Phone,
  Navigation,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  Sun,
  Moon,
  Compass,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { RupeeIcon } from './RupeeIcon';
import { DEFAULT_RATES, formatCurrencyINR } from '../utils/fuelCalculations';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenFleetModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onOpenFleetModal,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [heroImageMode, setHeroImageMode] = useState<'day' | 'dusk'>('dusk');
  const [activeHeroTab, setActiveHeroTab] = useState<'rates' | 'calculator'>('rates');
  const [heroCalcFuel, setHeroCalcFuel] = useState<'diesel' | 'petrol' | 'power95' | 'def_urea'>('diesel');
  const [heroCalcAmount, setHeroCalcAmount] = useState<number>(1000);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[90vh] flex flex-col justify-between">
      {/* Background Station Image with Depth Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageMode === 'dusk' ? '/images/pump_evening.jpg' : '/images/forecourt_main.jpg'}
          alt="Mehdipur Balaji Automobile HP Fuel Hub Forecourt"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center brightness-[0.32] scale-105 transition-all duration-1000 ease-out"
        />
        {/* Multilayer Radial & Linear Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Top Highway Alert / Status Ribbon */}
      <div className="relative z-10 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE 24×7 OPEN & OPERATIONAL
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline font-medium text-slate-300">
              Mathura – Hathras Highway Corridor
            </span>
            <span className="hidden lg:inline text-slate-400">·</span>
            <span className="hidden lg:inline font-mono text-blue-300">
              GPS: 27.662818° N, 77.910802° E
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {currentTime && (
              <span className="font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>IST {currentTime}</span>
              </span>
            )}
            <button
              onClick={() => setHeroImageMode(heroImageMode === 'dusk' ? 'day' : 'dusk')}
              className="text-[11px] font-semibold text-blue-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 border border-slate-700"
            >
              {heroImageMode === 'dusk' ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Day View</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-blue-400" />
                  <span>Night View</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column: Headline & Direct Highway Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-600/50 backdrop-blur-md text-xs font-bold text-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>HINDUSTAN PETROLEUM CORPORATION LIMITED · AUTHORIZED RETAIL OUTLET</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
                HP FUEL HUB
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-200 tracking-wide italic">
                Powering The journeys With Quality And Trust
              </p>
            </div>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Welcome to <strong className="text-white font-bold">Mehdipur Balaji Automobile</strong>. 
              The premier highway pitstop on the Mathura-Hathras highway corridor offering 
              guaranteed pure fuels, certified DEF urea, sanitized washrooms, free tire air, and round-the-clock driver assistance.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xl shadow-blue-900/50 transition-all active:scale-95 text-center"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>Get Highway Directions</span>
              </a>

              <a
                href="tel:+917906103090"
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all active:scale-95 text-center"
              >
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <span>+91 79061 03090</span>
              </a>

              <button
                onClick={onOpenCalculator}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl backdrop-blur-md transition-all active:scale-95 text-center"
              >
                <Calculator className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fuel Calculator</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Zero-Tolerance Metering</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15°C Hydrometer Density Tested</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 22241 Certified DEF Urea</span>
              </span>
            </div>
          </div>

          {/* Right Hero Column: Live Rates & Instant Calculator Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Digital Rates & Instant Calculator Card */}
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-700/70 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                    Aligarh (UP) Price Totem
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('rates')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activeHeroTab === 'rates'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Rates
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHeroTab('calculator')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                      activeHeroTab === 'calculator'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Quick Calc</span>
                  </button>
                </div>
              </div>

              {activeHeroTab === 'rates' ? (
                <>
                  {/* Quick Rates Rows */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setHeroCalcFuel('diesel');
                        setActiveHeroTab('calculator');
                      }}
                      className="bg-slate-950/70 hover:bg-slate-950 rounded-2xl p-3.5 border border-slate-800 hover:border-blue-600/60 transition-all text-left group"
                      title="Click to calculate for Diesel"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          High Speed Diesel
                        </span>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-800/80">
                          Fixed Rate
                        </span>
                      </div>
                      <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1 font-mono">
                        <RupeeIcon className="w-5 h-5 text-blue-400" />
                        <span>95.47</span>
                        <span className="text-[11px] font-normal text-slate-400">/L</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-emerald-400 font-semibold">Aligarh UP Rate</span>
                        <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Calc &rarr;</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHeroCalcFuel('petrol');
                        setActiveHeroTab('calculator');
                      }}
                      className="bg-slate-950/70 hover:bg-slate-950 rounded-2xl p-3.5 border border-slate-800 hover:border-blue-600/60 transition-all text-left group"
                      title="Click to calculate for Petrol"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Motor Spirit (Petrol)
                        </span>
                        <span className="text-[9px] font-semibold text-blue-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/80">
                          06:00 AM Sync
                        </span>
                      </div>
                      <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1 font-mono">
                        <RupeeIcon className="w-5 h-5 text-blue-400" />
                        <span>101.92</span>
                        <span className="text-[11px] font-normal text-slate-400">/L</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-emerald-400 font-semibold">Density: 720-775</span>
                        <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Calc &rarr;</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHeroCalcFuel('power95');
                        setActiveHeroTab('calculator');
                      }}
                      className="bg-slate-950/70 hover:bg-slate-950 rounded-2xl p-3.5 border border-slate-800 hover:border-amber-600/60 transition-all text-left group"
                      title="Click to calculate for HP Power 95"
                    >
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        HP Power 95 (Premium)
                      </span>
                      <div className="text-2xl font-extrabold text-amber-300 mt-1 flex items-center gap-1 font-mono">
                        <RupeeIcon className="w-5 h-5 text-amber-400" />
                        <span>104.50</span>
                        <span className="text-[11px] font-normal text-slate-400">/L</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-amber-400/80 font-semibold">High Octane Additive</span>
                        <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Calc &rarr;</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHeroCalcFuel('def_urea');
                        setActiveHeroTab('calculator');
                      }}
                      className="bg-slate-950/70 hover:bg-slate-950 rounded-2xl p-3.5 border border-slate-800 hover:border-cyan-600/60 transition-all text-left group"
                      title="Click to calculate for DEF Urea"
                    >
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                        HP DEF Urea (AUS 32)
                      </span>
                      <div className="text-2xl font-extrabold text-blue-300 mt-1 flex items-center gap-1 font-mono">
                        <RupeeIcon className="w-5 h-5 text-blue-400" />
                        <span>65.00</span>
                        <span className="text-[11px] font-normal text-slate-400">/L</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-blue-300/80 font-semibold">BS-VI Truck & Car</span>
                        <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">Calc &rarr;</span>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                /* Instant Refuel Calculator inside Hero */
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Selected Fuel Grade:</span>
                    <div className="flex gap-1">
                      {[
                        { id: 'diesel', label: 'Diesel', rate: '95.47' },
                        { id: 'petrol', label: 'Petrol', rate: '101.92' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setHeroCalcFuel(f.id as any)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors inline-flex items-center gap-0.5 ${
                            heroCalcFuel === f.id
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          <span>{f.label}</span>
                          <span className="opacity-80 inline-flex items-center">
                            (<RupeeIcon className="w-2 h-2 inline" />{f.rate})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rupee Amount Input & Quick Chips */}
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-1">
                      <span>Enter Refuel Budget (INR):</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RupeeIcon className="w-4 h-4 text-blue-400" />
                      </div>
                      <input
                        type="number"
                        min="100"
                        step="50"
                        value={heroCalcAmount}
                        onChange={(e) => setHeroCalcAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                        placeholder="e.g. 1000"
                      />
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {[500, 1000, 2000, 5000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setHeroCalcAmount(amt)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition-all inline-flex items-center justify-center gap-0.5 ${
                            heroCalcAmount === amt
                              ? 'bg-blue-600/40 text-blue-200 border-blue-500'
                              : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <RupeeIcon className="w-2.5 h-2.5" />
                          <span>{amt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Output Box */}
                  <div className="bg-black/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Exact Dispensed Litres</span>
                      <div className="text-xl font-extrabold text-emerald-400 font-mono">
                        {(heroCalcAmount / (heroCalcFuel === 'diesel' ? 95.47 : 101.92)).toFixed(2)}{' '}
                        <span className="text-xs text-slate-300 font-normal">Litres</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Est. Range (~16 km/L)</span>
                      <div className="text-xl font-extrabold text-blue-400 font-mono">
                        ~{Math.round((heroCalcAmount / (heroCalcFuel === 'diesel' ? 95.47 : 101.92)) * 16)}{' '}
                        <span className="text-xs text-slate-300 font-normal">km</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/40"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Open Detailed Trip Budget Calculator</span>
                  </button>
                </div>
              )}

              {/* Station Highway Corridor Badge */}
              <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300 font-medium">Mathura – Hathras – Aligarh Corridor</span>
                </div>
                <a
                  href="#location"
                  className="font-bold text-blue-300 hover:text-white underline flex items-center gap-0.5"
                >
                  <span>View Highway Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Emergency SOS Bar */}
            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Highway Assistance & SOS</span>
                  <span className="text-slate-400 text-[11px]">Direct station desk: +91 79061 03090</span>
                </div>
              </div>
              <a
                href="tel:+917906103090"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors"
              >
                Call Desk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Strip: Live Marquee of Guaranteed Qualities */}
      <div className="relative z-10 bg-blue-950/90 border-t border-blue-900/60 py-3 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-blue-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-white">Mehdipur Balaji Automobile:</span>
            <span>Zero Adulteration · 100% Quantity · 24/7 Sanitation · Continuous Clean Power</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Free Digital Air</span>
            <span>·</span>
            <span>Clean Washrooms</span>
            <span>·</span>
            <span>DEF Urea Station</span>
            <span>·</span>
            <span>HP Pay UPI Accepted</span>
          </div>
        </div>
      </div>
    </section>
  );
};
