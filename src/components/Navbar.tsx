import React, { useState } from 'react';
import { Phone, MapPin, Menu, X, Fuel, Sparkles, Navigation, Globe2, Activity, Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenUploadGuide: () => void;
  onOpenFleetModal: () => void;
  onOpenOwnerPortal?: () => void;
  onOpenDownloadApp?: () => void;
  currentLang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUploadGuide,
  onOpenFleetModal,
  onOpenOwnerPortal,
  onOpenDownloadApp,
  currentLang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Brand Wordmark & Official HP Emblem */}
          <div 
            onDoubleClick={onOpenOwnerPortal}
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            title="Double-click for Owner Portal"
          >
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/images/hp_logo.png"
                alt="HP Petrol Pump Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                {t.stationTitle}
              </span>
              <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
                {t.authorizedDealer}
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-700">
            <a href="#rates" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navRates}
            </a>
            <a href="#services" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navServices}
            </a>
            <a href="#about" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navAbout}
            </a>
            <a href="#calculator" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navCalculator}
            </a>
            <a href="#gallery" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navPhotos}
            </a>
            <a href="#location" className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
              {t.navLocation}
            </a>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 hover:border-blue-600 bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-800 transition-all flex items-center gap-1.5 shrink-0"
              title="Toggle English / Hindi"
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLang === 'en' ? 'Hindi (HI)' : 'English (EN)'}</span>
            </button>

            {/* AI Assistant Trigger */}
            <button
              onClick={() => {
                const chatBtn = document.querySelector('button[aria-label="Open Gemini AI Assistant"]') as HTMLButtonElement;
                if (chatBtn) chatBtn.click();
              }}
              className="text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-blue-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.navCopilot}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Direct Contact */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {onOpenDownloadApp && (
              <button
                type="button"
                onClick={onOpenDownloadApp}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
                title="Download HP Balaji Official App (Android & iOS)"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>{t.downloadApp}</span>
              </button>
            )}
            <a
              href="tel:+917906103090"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>+91 79061 03090</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t.getDirections}</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger & Quick Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            {onOpenDownloadApp && (
              <button
                type="button"
                onClick={onOpenDownloadApp}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-700 text-white shadow-sm active:scale-95 transition-all"
                title="Download App"
              >
                <Download className="w-3 h-3 text-blue-200" />
                <span>{t.downloadApp}</span>
              </button>
            )}
            <button
              onClick={onToggleLang}
              className="px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
            >
              {currentLang === 'en' ? 'HI' : 'EN'}
            </button>
            <a
              href="tel:+917906103090"
              className="p-2 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
              aria-label="Call station"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navRates}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navServices}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navAbout}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navCalculator}
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navPhotos}
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.navLocation}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const chatBtn = document.querySelector('button[aria-label="Open Gemini AI Assistant"]') as HTMLButtonElement;
                if (chatBtn) chatBtn.click();
              }}
              className="w-full text-left px-3 py-2 text-blue-900 bg-blue-50 rounded-lg font-semibold flex items-center justify-between"
            >
              <span>{t.navCopilot}</span>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUploadGuide();
              }}
              className="w-full text-left px-3 py-2 text-emerald-800 bg-emerald-50 rounded-lg font-semibold flex items-center justify-between"
            >
              <span>{t.navHostFree}</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div className="text-xs text-slate-500 font-medium px-1">Station Hotline (24x7):</div>
            <a
              href="tel:+917906103090"
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>+91 79061 03090</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=27.662818,77.910802"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.getDirections}</span>
            </a>
            {onOpenDownloadApp && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadApp();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-lg shadow-sm transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{t.downloadApp} (Android & iPhone)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
