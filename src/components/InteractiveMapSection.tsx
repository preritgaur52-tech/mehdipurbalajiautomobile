import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Compass,
  Shield,
  Car,
  Droplets,
  Bath,
  Gauge,
  Clock,
  Milestone,
} from 'lucide-react';
import { RupeeIcon } from './RupeeIcon';

export const InteractiveMapSection: React.FC = () => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('canopy');

  const latitude = '27.662818';
  const longitude = '77.910802';
  const coordinatesString = `${latitude}, ${longitude}`;

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(coordinatesString);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  // Nearby highway destinations and travel times
  const highwayDistances = [
    { name: 'Raya Bypass Junction', distance: '12 km', km: 12, time: '~15 mins', direction: 'West' },
    { name: 'Hathras City', distance: '18 km', km: 18, time: '~22 mins', direction: 'East' },
    { name: 'Mathura Junction', distance: '24 km', km: 24, time: '~35 mins', direction: 'West' },
    { name: 'Yamuna Expressway', distance: '26 km', km: 26, time: '~28 mins', direction: 'North-West' },
    { name: 'Aligarh District Hub', distance: '38 km', km: 38, time: '~45 mins', direction: 'North-East' },
    { name: 'Vrindavan Dham', distance: '28 km', km: 28, time: '~40 mins', direction: 'West' },
    { name: 'Sadabad Crossroad', distance: '19 km', km: 19, time: '~25 mins', direction: 'South' },
    { name: 'Agra Heritage Belt', distance: '54 km', km: 54, time: '~65 mins', direction: 'South' },
  ];

  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState<'car_diesel' | 'car_petrol' | 'bike' | 'truck'>('car_diesel');

  // Navigation markers
  const navigationMarkers = [
    {
      id: 'canopy',
      title: 'Main Fuel Dispensing Canopies',
      type: 'On-Site Facility',
      description: '4 multi-product high-speed dispensing bays for Petrol, High-Speed Diesel, and HP Power 95 with computerized delivery.',
      icon: Car,
      tag: 'Bay 1-4',
    },
    {
      id: 'air',
      title: 'Free Digital Air & Nitrogen Station',
      type: 'On-Site Facility',
      description: 'Located at forecourt entry for instant tire pressure checks and high-flow air inflation for all vehicle classes.',
      icon: Gauge,
      tag: 'Forecourt Entry',
    },
    {
      id: 'urea',
      title: 'BS-VI DEF Urea (AUS 32) Depot',
      type: 'Commercial Depot',
      description: 'Direct nozzle pumping station and sealed 20L cans for heavy transport vehicles, trailers, and diesel SUVs.',
      icon: Droplets,
      tag: 'Heavy Vehicle Bay',
    },
    {
      id: 'washrooms',
      title: 'Clean Washrooms & Drinking Water',
      type: 'Traveler Comfort',
      description: 'Sanitized restrooms, cold RO drinking water, and traveler rest porch located adjacent to the main office.',
      icon: Bath,
      tag: '24/7 Accessible',
    },
    {
      id: 'cross_hathras_mathura',
      title: 'Mathura - Hathras Highway Corridor',
      type: 'Key Cross-Street',
      description: 'Direct highway corridor connecting Mathura pilgrim city, Hathras industrial belt, and Raya township.',
      icon: Compass,
      tag: 'State Highway',
    },
    {
      id: 'cross_yamuna',
      title: 'Yamuna Expressway Interchange Access',
      type: 'Expressway Route',
      description: 'Fast connectivity to Noida/Greater Noida/Agra via the nearby expressway feeder road. Safe 24/7 rest stop.',
      icon: ExternalLink,
      tag: 'Expressway Link',
    },
  ];

  return (
    <section id="location" className="py-24 bg-white border-b border-slate-200 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
              <MapPin className="w-4 h-4" />
              <span>Exact Coordinates & Highway Navigation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Interactive Highway Map & Location
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl leading-relaxed">
              Conveniently positioned on the Mathura-Hathras Highway corridor. Look for the prominent blue and red HP canopy 
              with ample turning radius for multi-axle trailers, buses, and passenger cars.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyCoordinates}
              className="flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200"
              title="Copy latitude and longitude coordinates"
            >
              {copiedCoords ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Coordinates Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>GPS: {coordinatesString}</span>
                </>
              )}
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md shadow-blue-900/30 transition-all hover:scale-105 active:scale-100"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps App</span>
            </a>
          </div>
        </div>

        {/* Map and Amenity/Cross-Street Guide Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Responsive Embedded Google Map (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[440px] sm:h-[500px] lg:h-full min-h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <iframe
                title="Mehdipur Balaji Automobile HP Fuel Hub Location Map"
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=17&output=embed`}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating Map Pin Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    Mehdipur Balaji Automobile
                  </div>
                  <div className="text-[11px] text-blue-700 font-semibold">
                    HP Fuel Hub · Open 24 Hours
                  </div>
                </div>
              </div>

              {/* Direct Route Links Overlay at bottom */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-950/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl text-xs flex items-center justify-between gap-4 border border-slate-800">
                <span className="font-semibold text-slate-200">
                  Mathura – Hathras Road Landmark
                </span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-white font-bold underline flex items-center gap-1"
                >
                  <span>Start Turn-by-Turn Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Markers & Landmarks Guide (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-700" />
                  <span>On-Site Facilities & Highway Points</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Select to inspect</span>
              </div>

              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {navigationMarkers.map((marker) => {
                  const Icon = marker.icon;
                  const isSelected = selectedAmenity === marker.id;
                  return (
                    <button
                      key={marker.id}
                      onClick={() => setSelectedAmenity(marker.id)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all border ${
                        isSelected
                          ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20'
                          : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                          <span>{marker.title}</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                          {marker.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {marker.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact Card for Lost Travelers */}
            <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-blue-800/60">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">
                <Phone className="w-3.5 h-3.5 text-blue-300" />
                <span>Station Navigation Helpline</span>
              </div>
              <h4 className="text-lg font-bold mb-1">Approaching or need guidance?</h4>
              <p className="text-xs text-blue-200 mb-4 leading-relaxed">
                If you are on the road and need directions or forecourt space for trailers/buses, call our manager directly:
              </p>

              <div className="pt-1">
                <a
                  href="tel:+917906103090"
                  className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white text-slate-900 hover:bg-blue-50 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md w-full"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call Station Desk: +91 79061 03090</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highway Distance & Live Route Fuel Calculator */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-2">
              <Milestone className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">
                Corridor Distances & Route Fuel Cost Calculator
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Click any city or junction to compute trip fuel & cost
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            {highwayDistances.map((item, idx) => {
              const isSelected = selectedRouteIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedRouteIdx(idx)}
                  className={`rounded-2xl p-3 border transition-all text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <span className={`text-[11px] font-semibold block truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`} title={item.name}>
                    {item.name}
                  </span>
                  <span className={`text-lg font-extrabold mt-0.5 block font-mono ${isSelected ? 'text-white' : 'text-blue-700'}`}>
                    {item.distance}
                  </span>
                  <span className={`text-[10px] flex items-center justify-center gap-1 mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Fuel Calculation Card for Selected Route */}
          {(() => {
            const currentRoute = highwayDistances[selectedRouteIdx];
            const dist = currentRoute.km;
            const rates = {
              bike: { name: 'Motorcycle', fuel: 'Petrol', price: 101.92, kmpl: 50 },
              car_petrol: { name: 'Car (Petrol)', fuel: 'Petrol', price: 101.92, kmpl: 16 },
              car_diesel: { name: 'Car / SUV (Diesel)', fuel: 'Diesel (Fixed)', price: 95.47, kmpl: 17 },
              truck: { name: 'Truck / Bus', fuel: 'Diesel (Fixed)', price: 95.47, kmpl: 4 },
            };
            const currentVehicle = rates[selectedVehicleType];
            const litresNeeded = (dist / currentVehicle.kmpl).toFixed(2);
            const totalCost = Math.round(Number(litresNeeded) * currentVehicle.price);

            return (
              <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5 font-mono">
                    <span>Route Fuel Calculation</span>
                    <span>·</span>
                    <span>Mehdipur Balaji Automobile ⇄ {currentRoute.name} ({dist} km)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-slate-300 mr-1">Select Vehicle:</span>
                    {(Object.keys(rates) as Array<keyof typeof rates>).map((vKey) => (
                      <button
                        key={vKey}
                        type="button"
                        onClick={() => setSelectedVehicleType(vKey)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                          selectedVehicleType === vKey
                            ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
                        }`}
                      >
                        {rates[vKey].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 bg-black/40 px-5 py-3.5 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                      Estimated Fuel
                    </span>
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {litresNeeded} <span className="text-xs text-slate-300 font-normal">Litres</span>
                    </span>
                  </div>

                  <div className="w-px h-8 bg-slate-800" />

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                      Estimated Trip Cost
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center gap-1">
                      <RupeeIcon className="w-5 h-5 text-emerald-400" />
                      <span>{totalCost.toLocaleString('en-IN')}</span>{' '}
                      <span className="text-[11px] text-slate-400 font-normal inline-flex items-center gap-0.5">
                        (@ <RupeeIcon className="w-2.5 h-2.5" />{currentVehicle.price}/L)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
