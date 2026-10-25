import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle2, Flame, Droplet, FileText, Scale } from 'lucide-react';

export const QualityPledgeSection: React.FC = () => {
  const [densityFuel, setDensityFuel] = useState<'diesel' | 'petrol'>('diesel');
  const [observedDensity, setObservedDensity] = useState<number>(832);
  const [observedTemp, setObservedTemp] = useState<number>(27);

  const pillars = [
    {
      title: 'Filter Paper Purity Test',
      subtitle: 'Zero Residual Stain Guarantee',
      description: 'A drop of petrol placed on Whatman filter paper evaporates cleanly within 2 minutes without leaving any grease or pink stain, proving 100% adulteration-free fuel.',
      badge: 'Available On Request',
      icon: FileText,
    },
    {
      title: 'Hydrometer Density at 15°C',
      subtitle: 'Accurate Temperature Conversion',
      description: 'Daily morning density measurement using calibrated ASTM hydrometers and certified thermometers, checked against invoice parameters within strict ±3.0 kg/m³ limits.',
      badge: 'Tested Daily 6:00 AM',
      icon: Droplet,
    },
    {
      title: '5-Litre Calibrated Delivery Flask',
      subtitle: 'Weights & Measures Dept. Stamped',
      description: 'Verify exact quantity delivery with our brass 5-Litre measuring can officially inspected and stamped by the Weights & Measures Department, Government of Uttar Pradesh.',
      badge: '100% Exact Measure',
      icon: Scale,
    },
    {
      title: 'Automated Electronic Lock',
      subtitle: 'Tamper-Proof Underground Tanks',
      description: 'Automated computerized multi-product nozzles connected to underground telemetry, preventing manual tampering and locking automatically if density deviates.',
      badge: 'Digital Protection',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Award className="w-4 h-4 text-blue-700" />
            <span>HPCL Fuel Integrity Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 4 Pillars of Fuel Quality & Purity
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            At Mehdipur Balaji Automobile, quality is never a claim—it is a verifiable promise. 
            We invite every traveler, motorist, and fleet manager to inspect our daily calibration logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-blue-700 mb-3">
                    {pillar.subtitle}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Customer Inspection</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive ASTM 15°C Density Verification Tool */}
        <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-1.5 font-mono">
                <Droplet className="w-4 h-4 text-blue-400" />
                <span>ASTM 53B Calibration Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Live Fuel Density & Temperature Standard Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Test observed hydrometer and temperature readings to verify compliance with official Bureau of Indian Standards (BIS) specifications.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setDensityFuel('diesel')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  densityFuel === 'diesel'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                High Speed Diesel (820-860)
              </button>
              <button
                type="button"
                onClick={() => setDensityFuel('petrol')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  densityFuel === 'petrol'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Motor Spirit Petrol (720-775)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            <div className="md:col-span-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Observed Hydrometer Density (kg/m³):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={observedDensity}
                  onChange={(e) => setObservedDensity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-300">Ambient Temperature:</span>
                  <span className="font-mono font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded">
                    {observedTemp}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={observedTemp}
                  onChange={(e) => setObservedTemp(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="md:col-span-8 bg-black/50 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
              {(() => {
                const coefficient = densityFuel === 'petrol' ? 0.00085 : 0.00068;
                const tempDiff = observedTemp - 15;
                const densityAt15 = Number((observedDensity + tempDiff * coefficient * 1000).toFixed(1));
                const min = densityFuel === 'petrol' ? 720 : 820;
                const max = densityFuel === 'petrol' ? 775 : 860;
                const isPass = densityAt15 >= min && densityAt15 <= max;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Converted Standard Density @ 15°C
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                          isPass
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-red-950 text-red-300 border-red-700'
                        }`}
                      >
                        {isPass ? 'COMPLIANT WITH BIS' : 'DEVIATION DETECTED'}
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                      <span>{densityAt15}</span>
                      <span className="text-sm text-slate-400 font-normal">kg/m³</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2">
                      Standard Range for {densityFuel === 'diesel' ? 'High Speed Diesel' : 'Petrol'}:{' '}
                      <strong className="text-white font-mono">{min} - {max} kg/m³</strong>.
                      {isPass
                        ? ' This fuel passes official HPCL & Bureau of Indian Standards density criteria.'
                        : ' Note: Value is outside certified band.'}
                    </p>
                  </div>
                );
              })()}

              <div className="pt-3 mt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Free testing available at pump forecourt with calibrated 5L flask & hydrometer</span>
                <span className="text-blue-400 font-bold">Mehdipur Balaji Automobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
