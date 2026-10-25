import React, { useState } from 'react';
import { X, Send, CheckCircle, Truck, Phone, MessageSquare } from 'lucide-react';
import { validateFleetInquiry, formatCurrencyINR } from '../utils/fuelCalculations';
import { RupeeIcon } from './RupeeIcon';

interface FleetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FleetModal: React.FC<FleetModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [fuelType, setFuelType] = useState('High Speed Diesel (HSD)');
  const [quantityLiters, setQuantityLiters] = useState<number>(500);
  const [vehicleCount, setVehicleCount] = useState<number>(3);
  const [deliveryType, setDeliveryType] = useState<'station_refuel' | 'bulk_dispenser'>('station_refuel');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateFleetInquiry({
      fullName,
      phone,
      fuelType,
      quantityLiters,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all required fields.');
      return;
    }

    setErrorMessage('');
    const reference = `MBA-${Date.now().toString().slice(-6)}`;
    setSubmittedBookingId(reference);
  };

  const handleWhatsAppDispatch = () => {
    const text = encodeURI(
      `Hello Mehdipur Balaji Automobile (HP Fuel Hub),\nI would like to inquire about fleet / bulk fuel rates:\n- Order Ref: ${submittedBookingId}\n- Name/Company: ${fullName}\n- Phone: ${phone}\n- Requirement: ${quantityLiters}L of ${fuelType}\n- Vehicles: ${vehicleCount} units\n- Type: ${deliveryType === 'station_refuel' ? 'Scheduled Station Refueling' : 'Bulk Dispenser Delivery'}`
    );
    window.open(`https://wa.me/917906103090?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedBookingId ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              Bulk Inquiry Received!
            </h3>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Inquiry Reference ID:</span>
                <span className="font-mono font-bold text-blue-700">{submittedBookingId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Requested Product:</span>
                <span className="font-bold text-slate-900">{fuelType}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Estimated Volume:</span>
                <span className="font-bold text-slate-900">{quantityLiters} Litres</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Our station manager will contact you at <strong>{phone}</strong> shortly with custom commercial fleet pricing, credit terms, and priority fueling slots.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleWhatsAppDispatch}
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
              <Truck className="w-4 h-4" />
              <span>Commercial Fleet & Agriculture Hub</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Bulk Diesel & DEF Urea Inquiry
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Specialized rates, automated billing, and priority bays for transport operators, bus fleets, and tractors.
            </p>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company or Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Verma Transport Co."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 7906103090"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Required
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="High Speed Diesel (HSD)">High Speed Diesel (HSD)</option>
                  <option value="HP DEF Urea (AUS 32)">HP DEF Urea (AUS 32)</option>
                  <option value="Motor Spirit (Petrol)">Motor Spirit (Petrol)</option>
                  <option value="Diesel + DEF Combo">Diesel + DEF Urea Combo</option>
                  <option value="HP Lubricants / Barrel">HP Engine Lubricants / Barrels</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Quantity (Litres)
                </label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  required
                  value={quantityLiters}
                  onChange={(e) => setQuantityLiters(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fleet Vehicle Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={vehicleCount}
                  onChange={(e) => setVehicleCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fulfillment Mode
                </label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="station_refuel">Scheduled Refueling at Pump</option>
                  <option value="bulk_dispenser">On-Site Bowser / Bulk Delivery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Requirements or Route Timing (Optional)
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="e.g. Daily night transit for 4 trucks, need GST invoice..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Real-time Commercial Order & Rebate Calculator */}
            {(() => {
              const isDiesel = fuelType.includes('Diesel');
              const isUrea = fuelType.includes('Urea');
              const price = isDiesel ? 95.47 : isUrea ? 65.00 : 101.92;
              const gross = Math.round(quantityLiters * price);
              const rebate = Math.round(gross * 0.0075);
              const net = gross - rebate;

              return (
                <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-0.5">
                      Benchmark: <RupeeIcon className="w-3 h-3 text-slate-400 inline" />{price.toFixed(2)}/L (Aligarh UP)
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px]">HP DriveTrack Rebate</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-300">Volume: {quantityLiters} Litres</span>
                    <span className="font-extrabold text-white font-mono text-sm flex items-center gap-0.5">
                      <RupeeIcon className="w-3.5 h-3.5 text-white inline" />
                      <span>{gross.toLocaleString('en-IN')}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                    <span>DriveTrack Plus 0.75% Cashback:</span>
                    <span className="flex items-center gap-0.5">
                      - <RupeeIcon className="w-2.5 h-2.5 text-emerald-400 inline" />{rebate.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-800">
                    <span className="text-slate-200">Net Estimated Total:</span>
                    <span className="text-base font-extrabold text-emerald-300 font-mono flex items-center gap-0.5">
                      <RupeeIcon className="w-4 h-4 text-emerald-300 inline" />
                      <span>{net.toLocaleString('en-IN')}</span>
                    </span>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
