import React, { useState } from 'react';
import {
  Fuel,
  Sparkles,
  Gauge,
  ShoppingBag,
  Droplets,
  Bath,
  CheckCircle2,
  ArrowUpRight,
  HelpCircle,
  X,
  Truck,
  Car,
  Bike,
  Calculator,
} from 'lucide-react';
import { RupeeIcon } from './RupeeIcon';

interface ServicesSectionProps {
  onOpenFleetModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenFleetModal }) => {
  const [isTireGuideOpen, setIsTireGuideOpen] = useState(false);
  const [isUreaCalcOpen, setIsUreaCalcOpen] = useState(false);
  const [ureaDieselLiters, setUreaDieselLiters] = useState<number>(500);
  const [tireMonthlyKm, setTireMonthlyKm] = useState<number>(1500);

  const services = [
    {
      id: 'fueling',
      title: 'Premium & High-Grade Fueling',
      category: 'Pure HPCL Standard',
      description:
        'Refuel with high-octane petrol and cetane-rich diesel calibrated through micro-filtered, automated digital dispensers. Ensures maximum engine power, optimal fuel economy, and lower carbon deposits.',
      benefits: [
        'Pure HPCL motor spirit & high-speed diesel',
        'Electronic automated quantity cut-off',
        'Zero impurity guarantee with 15°C density check',
      ],
      image: '/images/forecourt_main.jpg',
      icon: Fuel,
      actionText: 'Inquire Bulk / Fleet Rate',
      actionType: 'fleet',
    },
    {
      id: 'tire-check',
      title: 'Tire Inflation & Pressure Check',
      category: 'Highway Safety',
      description:
        'Maintain balanced tire health and safety with our complimentary high-precision digital air and nitrogen inflation systems. Enhances highway stability and prevents unexpected punctures.',
      benefits: [
        'Free accurate digital tire gauge calibration',
        'Dual-point filling for heavy trucks and passenger cars',
        'Fast service by trained forecourt attendants',
      ],
      image: '/images/air_station.jpg',
      icon: Gauge,
      actionText: 'View Recommended PSI Chart',
      actionType: 'tireGuide',
    },
    {
      id: 'urea',
      title: 'Best Quality Urea (AUS 32 / DEF)',
      category: 'BS-VI Fleet Compliance',
      description:
        'Certified high-purity Diesel Exhaust Fluid (DEF) formulated specifically for modern BS-VI commercial trucks, buses, tractors, and diesel cars to safeguard catalytic converter life.',
      benefits: [
        'Guaranteed ISO 22241 compliance & purity',
        'Prevents SCR system crystallization and engine derate',
        'Available in bulk dispenser pumping & sealed containers',
      ],
      image: '/images/urea_station.jpg',
      icon: Droplets,
      actionText: 'Calculate DEF Dosage & Cost',
      actionType: 'ureaCalc',
    },
    {
      id: 'washrooms',
      title: 'Best Washroom Facilities',
      category: 'Traveler Hygiene',
      description:
        'Impeccably sanitized, clean, and accessible restrooms dedicated for long-distance commuters, families, tourists, and commercial truck drivers to refresh with total peace of mind.',
      benefits: [
        'Round-the-clock sanitation & deep cleaning',
        'Equipped with liquid soap, fresh running water & mirrors',
        'Dedicated secure facilities for ladies and gents',
      ],
      image: '/images/dispensers_canopy.jpg',
      icon: Bath,
      actionText: 'Visit Forecourt Facilities',
      actionType: 'location',
    },
    {
      id: 'car-wash',
      title: 'Express Vehicle & Windshield Wash',
      category: 'Forecourt Care',
      description:
        'Quick high-pressure windscreen cleaning and exterior dusting while you refuel. Clear highway grime and dust in minutes for crystal-clear road visibility and a spotless ride.',
      benefits: [
        'High-pressure spot-free rinse & windshield degreasing',
        'Rapid express turnaround under 5 minutes',
        'Complimentary for travelers upon full-tank refuel',
      ],
      image: '/images/forecourt_main.jpg',
      icon: Sparkles,
      actionText: 'Free with Full Tank',
      actionType: 'location',
    },
    {
      id: 'convenience-store',
      title: 'Highway Convenience Store & Cafe',
      category: 'Rest & Refreshment',
      description:
        'Stock up on journey essentials, packaged refreshments, cool mineral water, hot tea, energy drinks, and authentic HP engine lubricants before getting back on the road.',
      benefits: [
        'Chilled RO drinking water & quick travel snacks',
        'Genuine HP Lubricants (HP Milcy, HP Racer, Gear Oils)',
        '100% digital billing & contactless UPI / HP Pay',
      ],
      image: '/images/pump_evening.jpg',
      icon: ShoppingBag,
      actionText: 'Explore Products',
      actionType: 'location',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
            <span>Mehdipur Balaji Automobile</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Pitstop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Premium Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Engineered around traveler convenience, vehicle longevity, and journey safety. Experience genuine HP quality, 
            rapid turnarounds, and spotless hygiene at every step.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Service Image with Category Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-md">
                      {service.category}
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold tracking-wide uppercase text-blue-200">
                        HP Verified Facility
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Benefit Bullets */}
                    <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  {service.actionType === 'fleet' ? (
                    <button
                      onClick={onOpenFleetModal}
                      className="w-full py-3 px-4 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>{service.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : service.actionType === 'ureaCalc' ? (
                    <button
                      onClick={() => setIsUreaCalcOpen(true)}
                      className="w-full py-3 px-4 text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-600 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>{service.actionText}</span>
                      <Calculator className="w-4 h-4" />
                    </button>
                  ) : service.actionType === 'tireGuide' ? (
                    <button
                      onClick={() => setIsTireGuideOpen(true)}
                      className="w-full py-3 px-4 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>{service.actionText}</span>
                      <Gauge className="w-4 h-4" />
                    </button>
                  ) : (
                    <a
                      href="#location"
                      className="w-full py-3 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>{service.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Forecourt Highway Fleet Notice */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-blue-700/50">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest block">
              Transport & Fleet Logistics Hub
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Commercial Fleet Fueling & Bulk DEF Supply
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              We cater to logistics companies, bus operators, tractors, and multi-axle freight transporters. 
              Enjoy monthly GST invoicing, volume fuel pricing, and dedicated high-flow nozzles to minimize turn-around time.
            </p>
          </div>
          <button
            onClick={onOpenFleetModal}
            className="px-8 py-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-xl transition-all whitespace-nowrap shrink-0 hover:scale-105 active:scale-100"
          >
            Inquire Fleet Rates & Bulk Supply
          </button>
        </div>
      </div>

      {/* Tire Pressure Guide Modal */}
      {isTireGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsTireGuideOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest">
                <Gauge className="w-4 h-4" />
                <span>Highway Safety Guide</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Recommended Tire Pressure (PSI)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our attendants provide complimentary digital air filling for all vehicle classes:
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Bike className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Motorcycles & Scooters</span>
                      <span className="text-[11px] text-slate-500">Front: 28-30 PSI · Rear: 32-36 PSI</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    28 - 36 PSI
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Hatchbacks & Sedans</span>
                      <span className="text-[11px] text-slate-500">Balanced for highway cruising</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    32 - 35 PSI
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">SUVs, MUVs & Pickups</span>
                      <span className="text-[11px] text-slate-500">Heavier load highway stability</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    34 - 38 PSI
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">Commercial Trucks & Buses</span>
                      <span className="text-[11px] text-slate-500">Multi-axle radial and bias ply tires</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    100 - 120 PSI
                  </span>
                </div>
              </div>

              {/* Interactive Tire Fuel Loss Calculator */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-amber-700" />
                    <span>Under-Inflation Fuel Loss Calculator</span>
                  </span>
                  <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    {tireMonthlyKm} km/month
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="250"
                  value={tireMonthlyKm}
                  onChange={(e) => setTireMonthlyKm(Number(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                />
                {(() => {
                  // ~5 PSI low causes ~2.5% fuel loss (~0.5% per PSI)
                  const dieselUsed = tireMonthlyKm / 14;
                  const wastedL = Number((dieselUsed * 0.025).toFixed(1));
                  const wastedRupeesYear = Math.round(wastedL * 95.47 * 12);
                  return (
                    <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-amber-200 text-amber-950">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fuel Lost to Low PSI</span>
                        <span className="font-mono font-bold text-sm text-red-600">~{wastedL} Litres/mo</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Saved by Proper Inflation</span>
                        <span className="font-mono font-bold text-sm text-emerald-700 flex items-center justify-end gap-0.5">
                          <RupeeIcon className="w-3.5 h-3.5 inline-block text-emerald-700" />
                          <span>{wastedRupeesYear.toLocaleString('en-IN')}/year</span>
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 font-medium">
                Tip: Cold tire pressure readings are most accurate. Have our team check and top up free whenever you refuel!
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsTireGuideOpen(false)}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-all"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEF Urea (AUS 32) Dosage & Cost Calculator Modal */}
      {isUreaCalcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsUreaCalcOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-widest">
                <Droplets className="w-4 h-4" />
                <span>BS-VI Fleet SCR Calibration</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  DEF Urea Dosage & Cost Calculator
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  BS-VI diesel commercial trucks, buses, tractors, and modern SUVs require approximately <strong>4.5% DEF urea</strong> relative to diesel consumed.
                </p>
              </div>

              {/* Slider for Diesel Litres */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-extrabold text-slate-700">Diesel Consumption:</span>
                  <span className="font-mono font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                    {ureaDieselLiters} Litres Diesel
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={ureaDieselLiters}
                  onChange={(e) => setUreaDieselLiters(Number(e.target.value))}
                  className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="flex gap-1.5 mt-2">
                  {[200, 500, 1000, 2000].map((litres) => (
                    <button
                      key={litres}
                      type="button"
                      onClick={() => setUreaDieselLiters(litres)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                        ureaDieselLiters === litres
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {litres}L
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Output Cards */}
              {(() => {
                const defLiters = Number(((ureaDieselLiters * 4.5) / 100).toFixed(1));
                const buckets20L = Math.ceil(defLiters / 20);
                const totalCost = Math.round(defLiters * 65.00);

                return (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block font-mono">
                        Required DEF Urea
                      </span>
                      <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
                        {defLiters} <span className="text-xs text-slate-300 font-normal">Litres</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        (~{buckets20L} × 20L Buckets)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-950 text-white border border-cyan-800">
                      <span className="text-[10px] text-cyan-300 uppercase tracking-wide block font-mono">
                        Estimated DEF Cost
                      </span>
                      <div className="text-2xl font-extrabold text-white font-mono mt-1 flex items-center gap-1">
                        <RupeeIcon className="w-5 h-5 text-cyan-300" />
                        <span>{totalCost.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[11px] text-cyan-300 flex items-center gap-0.5 mt-0.5">
                        @ <RupeeIcon className="w-2.5 h-2.5" />65.00/L Authorized Rate
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsUreaCalcOpen(false);
                    onOpenFleetModal();
                  }}
                  className="flex-1 py-3 px-4 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-all shadow-md text-center"
                >
                  Order Commercial DEF Batch
                </button>
                <button
                  type="button"
                  onClick={() => setIsUreaCalcOpen(false)}
                  className="px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
