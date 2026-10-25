import React, { useState } from 'react';
import {
  Layers,
  Fuel,
  Gauge,
  Droplets,
  Bath,
  ShoppingBag,
  Car,
  Truck,
  Bike,
  CheckCircle2,
  Clock,
  Navigation,
  Shield,
  CreditCard,
  Zap,
} from 'lucide-react';

export const ForecourtVisualizer: React.FC = () => {
  const [activeBayId, setActiveBayId] = useState<string>('bay1');

  const bays = [
    {
      id: 'bay1',
      name: 'Bay 1: High-Speed Diesel (HSD)',
      category: 'Commercial Transport & Buses',
      tag: 'Heavy Vehicle Lane',
      icon: Truck,
      image: '/images/forecourt_main.jpg',
      specs: {
        product: 'High Speed Diesel (HSD)',
        speed: '60 Litres / Minute High-Flow',
        nozzles: 'Dual Commercial Multi-Nozzle',
        pressure: 'Calibrated Micro-Filter Mesh',
        turningRadius: 'Extra-Wide Radius for 18-Wheelers',
        payments: 'HP DriveTrack Plus · Fastag · UPI · Cash',
      },
      description:
        'Dedicated high-throughput fueling lane engineered specifically for multi-axle trailers, interstate buses, and agricultural tractors. High-flow nozzles fill full tanks in under 4 minutes with zero foaming.',
    },
    {
      id: 'bay2',
      name: 'Bay 2: Motor Spirit Petrol & HP Power 95',
      category: 'Passenger Cars & Two-Wheelers',
      tag: 'Quick Passenger Bay',
      icon: Car,
      image: '/images/dispensers_canopy.jpg',
      specs: {
        product: 'Motor Spirit (MS) & HP Power 95',
        speed: '40 Litres / Minute Precision Cut-Off',
        nozzles: 'Multi-Product Color Coded Dispenser',
        pressure: 'Automatic Vapor Recovery System',
        turningRadius: 'Smooth Drive-Through Island',
        payments: 'HP Pay Contactless · Cards · UPI QR',
      },
      description:
        'Computerized multi-product dispensers serving pure regular petrol and friction-reducing HP Power 95. Features automatic zero-reset before every fuel delivery and instant digital SMS billing.',
    },
    {
      id: 'bay3',
      name: 'Bay 3: Certified DEF Urea (AUS 32) Depot',
      category: 'BS-VI Heavy Diesel Compliance',
      tag: 'Dedicated DEF Station',
      icon: Droplets,
      image: '/images/urea_station.jpg',
      specs: {
        product: 'HP Diesel Exhaust Fluid (AUS-32 / DEF)',
        speed: 'Direct Nozzle & 20L Sealed Buckets',
        nozzles: 'ISO 22241 Contamination-Proof Spout',
        pressure: 'Clean Deionized Tank System',
        turningRadius: 'Spacious Trailer Turning Island',
        payments: 'Fleet Account Invoicing · Cards · Cash',
      },
      description:
        'Certified high-purity AUS-32 diesel exhaust fluid station. Essential for all BS-VI trucks, buses, tractors, and diesel passenger cars to safeguard catalytic SCR systems against expensive repair.',
    },
    {
      id: 'bay4',
      name: 'Bay 4: Free Digital Air & Nitrogen Inflation',
      category: 'Tire Health & Highway Safety',
      tag: 'Complimentary Service',
      icon: Gauge,
      image: '/images/air_station.jpg',
      specs: {
        product: 'Automated Digital Air & Nitrogen',
        speed: 'Rapid High-Accuracy Sensor Fill',
        nozzles: 'Dual Heavy-Duty Chuck Hoses',
        pressure: 'Calibrated up to 150 PSI',
        turningRadius: 'Forecourt Entry Air Porch',
        payments: '100% Free Complimentary Amenity',
      },
      description:
        'Free automated digital air filling and pressure calibration. Trained station attendants test tire pressures for motorcycles, cars, and commercial trucks to ensure safe highway cruising.',
    },
    {
      id: 'bay5',
      name: 'Bay 5: Sanitized Traveler Washrooms & RO Water',
      category: 'Traveler Comfort & Hygiene',
      tag: '24/7 Sanity Guarantee',
      icon: Bath,
      image: '/images/dispensers_canopy.jpg',
      specs: {
        product: 'Sanitized Restrooms & Cold RO Water',
        speed: 'Cleaned Continuously Round-The-Clock',
        nozzles: 'Running Tap Water, Liquid Soap & Mirrors',
        pressure: 'Deep Clean Sanitized Facilities',
        turningRadius: 'Adjacent to Main Station Office',
        payments: 'Free for All Highway Commuters',
      },
      description:
        'Spotlessly clean, well-lit, and hygienic restrooms for families, tourists, and commercial drivers traveling the Mathura-Hathras highway corridor. Equipped with fresh running water, mirrors, and cold RO drinking water.',
    },
  ];

  const activeBay = bays.find((b) => b.id === activeBayId) || bays[0];
  const Icon = activeBay.icon;

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            <Layers className="w-4 h-4 text-blue-700" />
            <span>Interactive Station Forecourt Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Forecourt Bays & Facility Inspector
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Inspect our specialized fueling islands, heavy-duty commercial lanes, DEF depot, and complimentary amenities before arriving at the station.
          </p>
        </div>

        {/* Bay Selection Buttons Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {bays.map((bay) => {
            const BayIcon = bay.icon;
            const isSelected = activeBayId === bay.id;
            return (
              <button
                key={bay.id}
                onClick={() => setActiveBayId(bay.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-700 text-white border-blue-700 shadow-xl shadow-blue-900/20 ring-2 ring-blue-700/50 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200/90 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <BayIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {bay.tag}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-tight">{bay.name}</h4>
              </button>
            );
          })}
        </div>

        {/* Selected Bay Deep Dive Showcase Card */}
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Photo (5 Cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={activeBay.image}
                alt={activeBay.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />

              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-blue-300 flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{activeBay.category}</span>
              </div>
            </div>

            {/* Specifications & Blueprint Details (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>ACTIVE FORECOURT BAY · 24/7 ATTENDANT OPERATED</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {activeBay.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeBay.description}
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Primary Product:</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{activeBay.specs.product}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Dispensing Flow Speed:</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{activeBay.specs.speed}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Calibration & Vapor Lock:</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{activeBay.specs.pressure}</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Accepted Payments:</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{activeBay.specs.payments}</span>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 font-medium">
                  Turning Radius: {activeBay.specs.turningRadius}
                </span>

                <a
                  href="#location"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate to this Bay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
