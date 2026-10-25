import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle, Navigation } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
                <span>About Mehdipur Balaji Automobile</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                ABOUT US
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 text-base sm:text-lg">
                Welcome to Mehdipur Balaji Automobile, your trusted HP Fuel Hub. We are dedicated to powering your journeys with uncompromised quality, reliability, and exceptional customer service.
              </p>

              <p className="text-slate-600">
                We understand that a great road trip or a daily commute requires more than just premium fuel. That is why we have built a comprehensive pitstop designed entirely around your convenience and vehicle's needs. Whether you are driving a personal car or managing a commercial fleet, our priority is to ensure you get back on the road safely and comfortably.
              </p>
            </div>

            {/* Why Choose Us Feature List */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-700" />
                <span>Why Choose Us?</span>
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Superior Fuel Quality
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      As an authorized HP station, we guarantee pure, high-grade fuel and exact quantities to keep your engine running at peak performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Premium Quality Urea
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      We stock the best quality urea (DEF) to support our commercial and diesel drivers in maintaining optimal vehicle efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Top-Tier Washroom Facilities
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      We maintain clean, hygienic, and accessible washrooms so you can refresh and recharge during your journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Air Filling Station
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Keep your tires in perfect condition with our accurate and easy-to-use air filling services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Concluding Partner Statement */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
              At Mehdipur Balaji Automobile, we are more than just a refueling stop—we are a dedicated partner in your travels. Stop by today and experience service where quality and trust meet.
            </div>
          </div>

          {/* Right Column: Authentic Station Visual Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-900">
              <img
                src="/images/pump_evening.jpg"
                alt="Mehdipur Balaji Automobile Evening Forecourt View"
                loading="lazy"
                decoding="async"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Highway Landmark
                </span>
                <h4 className="text-lg font-bold text-white">
                  Mehdipur Balaji Automobile
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Illuminated 24/7 canopy on the Mathura-Hathras highway corridor.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-blue-700">100%</span>
                <span className="text-xs text-slate-600 font-medium">HPCL Quality Standards</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <span className="block text-2xl font-extrabold text-blue-700">24 × 7</span>
                <span className="text-xs text-slate-600 font-medium">Continuous Highway Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
