import React, { useState } from 'react';
import {
  Calculator,
  Fuel,
  Gauge,
  Droplets,
  RotateCcw,
  Navigation,
  Check,
  Truck,
  Car,
  Bike,
  Route,
  Sparkles,
} from 'lucide-react';
import {
  DEFAULT_RATES,
  calculateFuelTripCost,
  calculateDefRequirement,
  formatCurrencyINR,
} from '../utils/fuelCalculations';
import { RupeeIcon } from './RupeeIcon';

interface TripCalculatorProps {
  initialFuelId?: string;
}

export const TripCalculator: React.FC<TripCalculatorProps> = ({ initialFuelId = 'diesel' }) => {
  const [distanceKm, setDistanceKm] = useState<number>(150);
  const [mileageKmpl, setMileageKmpl] = useState<number>(14);
  const [selectedFuelId, setSelectedFuelId] = useState<string>(initialFuelId);
  const [isCommercialVehicle, setIsCommercialVehicle] = useState<boolean>(false);
  const [selectedPresetName, setSelectedPresetName] = useState<string>('Custom');

  const selectedRate = DEFAULT_RATES.find((r) => r.id === selectedFuelId) || DEFAULT_RATES[0];
  const { litersRequired, estimatedCost, costPerKm } = calculateFuelTripCost(
    distanceKm,
    mileageKmpl,
    selectedRate.price
  );

  const defUrea = isCommercialVehicle ? calculateDefRequirement(litersRequired) : null;

  // Real highway vehicle presets
  const vehiclePresets = [
    {
      name: 'Heavy Truck (16-Wheeler)',
      icon: Truck,
      fuel: 'diesel',
      mileage: 3.5,
      isCommercial: true,
      tag: 'Tata/BharatBenz',
    },
    {
      name: 'Interstate Tour Bus',
      icon: Truck,
      fuel: 'diesel',
      mileage: 4.5,
      isCommercial: true,
      tag: 'Volvo/Ashok Leyland',
    },
    {
      name: 'Commercial Pickup / Bolero',
      icon: Truck,
      fuel: 'diesel',
      mileage: 12,
      isCommercial: true,
      tag: 'Mahindra Bolero',
    },
    {
      name: 'Highway SUV (Diesel)',
      icon: Car,
      fuel: 'diesel',
      mileage: 11,
      isCommercial: false,
      tag: 'Scorpio/Innova',
    },
    {
      name: 'Passenger Sedan (Petrol)',
      icon: Car,
      fuel: 'petrol',
      mileage: 17,
      isCommercial: false,
      tag: 'Dzire/City/Swift',
    },
    {
      name: 'Motorcycle / Scooter',
      icon: Bike,
      fuel: 'petrol',
      mileage: 50,
      isCommercial: false,
      tag: 'Splendor/Activa',
    },
  ];

  // Common Highway Travel Corridors
  const highwayRoutes = [
    { name: 'Mathura ⇄ Hathras Route', km: 42 },
    { name: 'Noida ⇄ Vrindavan Dham', km: 145 },
    { name: 'Delhi ⇄ Agra (Yamuna Expy)', km: 215 },
    { name: 'Aligarh ⇄ Hathras ⇄ Agra', km: 92 },
  ];

  const handleApplyVehiclePreset = (v: typeof vehiclePresets[0]) => {
    setSelectedPresetName(v.name);
    setMileageKmpl(v.mileage);
    setSelectedFuelId(v.fuel);
    setIsCommercialVehicle(v.isCommercial);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            <Calculator className="w-4 h-4" />
            <span>Classic Hi-Tech Telemetry Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Highway Fuel & DEF Budget Calculator
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Select your specific vehicle type or enter custom distance to calculate exact calibrated fuel requirements, 
            cost per kilometer, and BS-VI DEF urea needs before refueling.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Input Controls (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Vehicle Preset Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2.5">
                  1. Quick Vehicle Profile Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {vehiclePresets.map((vp, idx) => {
                    const VIcon = vp.icon;
                    const isSelected = selectedPresetName === vp.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyVehiclePreset(vp)}
                        className={`p-2.5 text-left rounded-xl border transition-all text-xs ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600 font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <VIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                          <span className="text-[10px] text-slate-400 font-normal">{vp.tag}</span>
                        </div>
                        <div className="truncate font-semibold">{vp.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          ~{vp.mileage} km/L
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fuel Type Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  2. Fuel Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DEFAULT_RATES.filter((r) => r.type !== 'urea').map((rate) => (
                    <button
                      key={rate.id}
                      type="button"
                      onClick={() => setSelectedFuelId(rate.id)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-left transition-all ${
                        selectedFuelId === rate.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="truncate">{rate.name.split('(')[0]}</div>
                      <div className="text-[11px] text-slate-500 font-normal flex items-center gap-0.5 mt-0.5 font-mono">
                        <RupeeIcon className="w-3 h-3 text-slate-500" />
                        <span>{rate.price.toFixed(2)}/L</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highway Corridor Quick Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    3. Travel Distance (Kilometers)
                  </label>
                  <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 font-mono">
                    {distanceKm} km
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">Corridors:</span>
                  {highwayRoutes.map((hr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDistanceKm(hr.km)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors border border-slate-200"
                    >
                      {hr.name} ({hr.km} km)
                    </button>
                  ))}
                </div>
              </div>

              {/* Mileage Fine-Tuning */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    4. Average Fuel Mileage
                  </label>
                  <span className="text-sm font-extrabold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg font-mono">
                    {mileageKmpl} km/L
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="65"
                  step="0.5"
                  value={mileageKmpl}
                  onChange={(e) => {
                    setMileageKmpl(Number(e.target.value));
                    setSelectedPresetName('Custom');
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                />
              </div>

              {/* DEF Urea Toggle */}
              {selectedRate.type === 'diesel' && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-blue-50/70 rounded-xl border border-blue-200/80">
                    <input
                      type="checkbox"
                      checked={isCommercialVehicle}
                      onChange={(e) => setIsCommercialVehicle(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <div>
                      <span className="text-xs font-bold text-blue-950 block">
                        Include BS-VI DEF Urea (AUS 32) Estimation
                      </span>
                      <span className="text-[11px] text-blue-700">
                        Calculates standard 4.5% DEF consumption required to maintain SCR catalytic filters.
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Results Output Screen (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-blue-400 uppercase tracking-wider mb-6 font-mono">
                  <span>Calculated Telemetry</span>
                  <span>{selectedRate.name.split('(')[0]}</span>
                </div>

                <div className="space-y-6">
                  {/* Estimated Volume */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono block mb-1">
                      Calibrated Fuel Volume Needed
                    </span>
                    <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
                      {litersRequired}{' '}
                      <span className="text-sm font-normal text-slate-300">Litres</span>
                    </div>
                  </div>

                  {/* Estimated Cost */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono block mb-1">
                      Total Estimated Trip Cost
                    </span>
                    <div className="text-4xl font-extrabold text-blue-400 tracking-tight flex items-center gap-1.5 font-mono">
                      <RupeeIcon className="w-8 h-8 text-blue-400" />
                      <span>{estimatedCost.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-mono">
                      <span>Approx.</span>
                      <RupeeIcon className="w-3.5 h-3.5 text-slate-400 inline" />
                      <span>{costPerKm.toFixed(2)} per km</span>
                    </span>
                  </div>

                  {/* DEF Breakdown */}
                  {defUrea && (
                    <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 mb-1">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                        <span>DEF (AUS 32 Urea) Required:</span>
                      </div>
                      <div className="text-xl font-extrabold text-white font-mono">
                        ~{defUrea.defLitersRequired} Litres
                        <span className="text-xs text-slate-300 font-normal ml-1">
                          ({defUrea.defBuckets20L} × 20L Bucket)
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-300 block mt-1 font-mono">
                        Estimated DEF Cost: ₹{(defUrea.defLitersRequired * 65).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 space-y-2">
                <a
                  href="#location"
                  className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-100"
                >
                  <Navigation className="w-4 h-4 text-blue-700" />
                  <span>Start Turn-by-Turn to Fuel Hub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
