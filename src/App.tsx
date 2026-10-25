import React, { useState } from 'react';
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
import { Language } from './utils/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [isGoogleGuideOpen, setIsGoogleGuideOpen] = useState(false);
  const [calculatorFuelId, setCalculatorFuelId] = useState('diesel');

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
      />

      {/* Main Content Sections with mobile bottom bar offset */}
      <main className="flex-grow pb-16 sm:pb-0">
        {/* Classic Hi-Tech Hero Section with Day/Night Illumination, Live Clock, and Digital Totem Preview */}
        <Hero
          onOpenCalculator={() => handleOpenCalculator('diesel')}
          onOpenFleetModal={() => setIsFleetModalOpen(true)}
        />

        {/* Live Daily Fuel & DEF Rates Board */}
        <RateBoard onOpenCalculator={handleOpenCalculator} />

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

      {/* Automatic Hindi Voice Intro Player (starts on open website) */}
      <AutoVoiceIntro />

      {/* Gemini AI Highway Assistant & Real-Time Voice Conversation */}
      <GeminiChatbot />

      {/* Sticky Bottom Highway Quick Bar for Mobile Devices */}
      <MobileQuickBar
        onOpenCalculator={() => handleOpenCalculator('diesel')}
        onOpenCopilot={() => {
          const chatBtn = document.querySelector('button[aria-label="Open Gemini AI Assistant"]') as HTMLButtonElement;
          if (chatBtn) chatBtn.click();
        }}
      />
    </div>
  );
}
