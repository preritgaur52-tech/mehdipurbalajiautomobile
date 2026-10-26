import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RateBoard } from './components/RateBoard';
import { QualityPledgeSection } from './components/QualityPledgeSection';
import { ForecourtTelemetry } from './components/ForecourtTelemetry';
import { ForecourtVisualizer } from './components/ForecourtVisualizer';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { TripCalculator } from './components/TripCalculator';
import { GallerySection } from './components/GallerySection';
import { FleetModal } from './components/FleetModal';
import { GoogleHostingGuideModal } from './components/GoogleHostingGuideModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { AutoVoiceIntro } from './components/VoiceIntroPlayer';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileQuickBar } from './components/MobileQuickBar';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { useFuelRates } from './hooks/useFuelRates';
import { Language } from './utils/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [isGoogleGuideOpen, setIsGoogleGuideOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [focusedFuelId, setFocusedFuelId] = useState<string | undefined>();
  const [calculatorFuelId, setCalculatorFuelId] = useState('diesel');

  const { rates, refreshRates } = useFuelRates();

  const handleOpenOwnerPortal = (fuelId?: string) => {
    setFocusedFuelId(fuelId);
    setIsOwnerModalOpen(true);
  };

  // Hidden owner portal triggers (#owner / #admin), download app (#download / #app / #install), and keyboard shortcut (Alt+Shift+P)
  useEffect(() => {
    const handleCheckHash = () => {
      if (window.location.hash === '#owner' || window.location.hash === '#admin') {
        setIsOwnerModalOpen(true);
      } else if (
        window.location.hash === '#download' ||
        window.location.hash === '#install' ||
        window.location.hash === '#app'
      ) {
        setIsDownloadModalOpen(true);
      }
    };
    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && e.shiftKey && e.key.toLowerCase() === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p')
      ) {
        setIsOwnerModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleCheckHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenCalculator = (fuelId: string) => {
    setCalculatorFuelId(fuelId);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
      {/* Highway Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Top Navigation Bar with Language Toggle & Direct Call Actions */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenUploadGuide={() => setIsGoogleGuideOpen(true)}
        onOpenFleetModal={() => setIsFleetModalOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerModalOpen(true)}
        onOpenDownloadApp={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Sections with mobile bottom bar offset */}
      <main className="flex-grow pb-16 sm:pb-0">
        {/* Classic Hi-Tech Hero Section with Day/Night Illumination, Live Clock, and Digital Totem Preview */}
        <Hero
          onOpenCalculator={() => handleOpenCalculator('diesel')}
          onOpenFleetModal={() => setIsFleetModalOpen(true)}
          onOpenOwnerPortal={handleOpenOwnerPortal}
          onOpenDownloadApp={() => setIsDownloadModalOpen(true)}
          rates={rates}
        />

        {/* Live Daily Fuel & DEF Rates Board */}
        <RateBoard
          onOpenCalculator={handleOpenCalculator}
          onOpenOwnerPortal={handleOpenOwnerPortal}
        />

        {/* Live Forecourt IoT Density & Tank Telemetry Grid */}
        <ForecourtTelemetry />

        {/* 4 Pillars of Fuel Quality & Purity Assurance */}
        <QualityPledgeSection />

        {/* Interactive Forecourt Bay & Nozzle Blueprint Inspector */}
        <ForecourtVisualizer />

        {/* Services Section (Premium Fueling, Express Car Wash, Tire Inflation & Check, Convenience Store, Urea, Washrooms) */}
        <ServicesSection onOpenFleetModal={() => setIsFleetModalOpen(true)} />

        {/* Interactive Google Map Section with Highway Distance Matrix & Cross-streets */}
        <InteractiveMapSection />

        {/* Customer Testimonials & Reviews with Live Submission Modal */}
        <TestimonialsSection />

        {/* Authentic About Us & Why Choose Us Section */}
        <AboutSection />

        {/* Hi-Tech Fuel Cost & Highway Trip Calculator with Commercial Vehicle Presets */}
        <TripCalculator initialFuelId={calculatorFuelId} />

        {/* Verified Station Photo Gallery with Fullscreen Lightbox */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer
        onOpenUploadGuide={() => setIsGoogleGuideOpen(true)}
        onOpenFleetModal={() => setIsFleetModalOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerModalOpen(true)}
        onOpenDownloadApp={() => setIsDownloadModalOpen(true)}
      />

      {/* Commercial Fleet & Bulk Inquiry Modal */}
      <FleetModal
        isOpen={isFleetModalOpen}
        onClose={() => setIsFleetModalOpen(false)}
      />

      {/* Google Hosting Step-by-Step Guide Modal */}
      <GoogleHostingGuideModal
        isOpen={isGoogleGuideOpen}
        onClose={() => setIsGoogleGuideOpen(false)}
      />

      {/* Official HP Balaji Mobile App Download Modal */}
      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => {
          setIsDownloadModalOpen(false);
          if (
            window.location.hash === '#download' ||
            window.location.hash === '#install' ||
            window.location.hash === '#app'
          ) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currentLang={currentLang}
      />

      {/* Hidden Station Owner Portal & AI Model Training Modal */}
      <OwnerPortalModal
        isOpen={isOwnerModalOpen}
        initialFuelId={focusedFuelId}
        onClose={() => {
          setIsOwnerModalOpen(false);
          setFocusedFuelId(undefined);
          if (window.location.hash === '#owner' || window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currentRates={rates}
        onRatesUpdated={refreshRates}
      />

      {/* Automatic Hindi Voice Intro Player (starts on open website) */}
      <AutoVoiceIntro />

      {/* Gemini AI Highway Assistant & Real-Time Voice Conversation */}
      <GeminiChatbot />

      {/* Sticky Bottom Highway Quick Bar for Mobile Devices */}
      <MobileQuickBar
        onOpenCalculator={() => handleOpenCalculator('diesel')}
        onOpenDownloadApp={() => setIsDownloadModalOpen(true)}
        onOpenCopilot={() => {
          const chatBtn = document.querySelector('button[aria-label="Open Gemini AI Assistant"]') as HTMLButtonElement;
          if (chatBtn) chatBtn.click();
        }}
      />
    </div>
  );
}
