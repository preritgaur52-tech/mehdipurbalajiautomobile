import React from 'react';
import { Phone, MapPin, Navigation, Mail, ShieldCheck, Heart, Sparkles, Lock, Download } from 'lucide-react';

interface FooterProps {
  onOpenUploadGuide: () => void;
  onOpenFleetModal: () => void;
  onOpenOwnerPortal?: () => void;
  onOpenDownloadApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenUploadGuide,
  onOpenFleetModal,
  onOpenOwnerPortal,
  onOpenDownloadApp,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Authorization Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center">
                <img
                  src="/images/hp_logo.png"
                  alt="HPCL Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Mehdipur Balaji Automobile
                </h3>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  HP Fuel Hub · Retail Outlet
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Powering journeys with uncompromised quality and trust. Authorized retail dealer of Hindustan Petroleum Corporation Limited (HPCL). Providing high-grade fuels, pure DEF urea, tire maintenance, and clean traveler amenities.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <strong className="text-white">Operating Hours:</strong> 24 Hours / 7 Days a Week
              </div>
              <div>
                <strong className="text-white">GPS Coordinates:</strong> 27.662818° N, 77.910802° E
              </div>
            </div>
          </div>

          {/* Quick Nav Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Station Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rates" className="hover:text-white transition-colors">
                  Daily Fuel & DEF Rates
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services (Fuel, Wash, Air, Store)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Testimonials
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us & Quality Pledge
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Trip Fuel Cost Calculator
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Station Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Highway Location & Route Map
                </a>
              </li>
              {onOpenDownloadApp && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenDownloadApp}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Mobile App (Android & iOS)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Station Hotlines & Actions (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Direct Station Contact
            </h4>
            <div className="space-y-2.5">
              <a
                href="tel:+917906103090"
                className="flex items-center gap-3 p-3.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">+91 79061 03090</div>
                  <div className="text-[11px] text-slate-400">Station Desk & Highway Manager (24x7)</div>
                </div>
              </a>

              <div className="pt-2 flex flex-col gap-2">
                {onOpenDownloadApp && (
                  <button
                    type="button"
                    onClick={onOpenDownloadApp}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 border border-blue-600/80 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Official Mobile App</span>
                  </button>
                )}
                <button
                  onClick={onOpenUploadGuide}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How to Upload on Google for Free</span>
                </button>
                <button
                  onClick={onOpenFleetModal}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-900/60 hover:bg-blue-800 border border-blue-700 text-blue-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Commercial Fleet / Bulk Fuel Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Mehdipur Balaji Automobile. All rights reserved. Authorized HPCL Dealer.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Calibrated Fuel Quality</span>
            </span>
            {onOpenOwnerPortal && (
              <button
                type="button"
                onClick={onOpenOwnerPortal}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-400 transition-colors py-1 px-1.5 rounded-lg group text-[11px]"
                title="Forecourt Master Console · Station Owner Access (PIN Protected)"
                aria-label="Owner Access Portal"
              >
                <Lock className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                <span className="opacity-70 group-hover:opacity-100 font-medium">Owner Access</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
