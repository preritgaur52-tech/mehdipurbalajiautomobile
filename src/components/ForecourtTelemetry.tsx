import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  ShieldCheck,
  Droplet,
  Thermometer,
  Gauge,
  Wifi,
  Lock,
  Layers,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const ForecourtTelemetry: React.FC = () => {
  const [pulse, setPulse] = useState(false);
  const [lastSync, setLastSync] = useState<string>('Just now');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
      setLastSync('Synchronized');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const telemetryData = [
    {
      tankId: 'TK-01 HSD',
      product: 'High Speed Diesel (Underground Tank)',
      density: '834.8 kg/m³',
      densityTarget: '820 - 860 kg/m³ @ 15°C',
      temp: '15.2°C',
      purity: '99.98% Micro-filtered',
      status: 'CALIBRATED & SEALED',
      dispenserFlow: '60 L/min High-Speed Nozzle',
      color: 'blue',
    },
    {
      tankId: 'TK-02 MS',
      product: 'Motor Spirit Petrol (Underground Tank)',
      density: '742.6 kg/m³',
      densityTarget: '720 - 775 kg/m³ @ 15°C',
      temp: '15.0°C',
      purity: '100% Zero-Residue Evap',
      status: 'CALIBRATED & SEALED',
      dispenserFlow: '40 L/min Micro-filtered',
      color: 'emerald',
    },
    {
      tankId: 'TK-03 PWR',
      product: 'HP Power 95 (Premium Octane Reserve)',
      density: '748.2 kg/m³',
      densityTarget: '725 - 780 kg/m³ @ 15°C',
      temp: '15.1°C',
      purity: '95.2 RON Octane Rating',
      status: 'ACTIVE ADDITIVE INJECTION',
      dispenserFlow: '42 L/min Multi-Nozzle',
      color: 'amber',
    },
    {
      tankId: 'TK-04 DEF',
      product: 'HP Diesel Exhaust Fluid (AUS-32 Depot)',
      density: '1090.4 kg/m³',
      densityTarget: '1087 - 1093 kg/m³ @ 20°C',
      temp: '18.4°C',
      purity: '32.5% High-Purity Urea',
      status: 'ISO 22241 CERTIFIED',
      dispenserFlow: 'Dedicated DEF Pump Bay',
      color: 'cyan',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden font-sans">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>HPCL Automated Forecourt Telemetry & IoT Sensor Grid</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">ALL TANKS NOMINAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Station Density & Tank Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Real-time underground fuel temperature compensation, electronic density monitoring, and micro-filtration telemetry transmitted from our computerized pumps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2 flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Forecourt Telemetry: Online</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-blue-400 flex items-center gap-1">
                <RefreshCw className={`w-3 h-3 ${pulse ? 'animate-spin' : ''}`} />
                <span>{lastSync}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Hi-Tech Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {telemetryData.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Sensor Tag */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/60">
                    {item.tankId}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>ONLINE</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-4 line-clamp-1 group-hover:text-blue-300 transition-colors">
                  {item.product}
                </h3>

                {/* Primary Metric: Density */}
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 mb-4">
                  <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider flex items-center justify-between">
                    <span>15°C Converted Density</span>
                    <Gauge className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-1 tracking-tight">
                    {item.density}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Std Range: {item.densityTarget}
                  </div>
                </div>

                {/* Secondary Diagnostics List */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-amber-400" />
                      <span>Temp:</span>
                    </span>
                    <span className="text-slate-200 font-bold">{item.temp}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Filtration:</span>
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px] truncate max-w-[130px]">
                      {item.purity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span>Discharge:</span>
                    </span>
                    <span className="text-slate-300 font-medium text-[11px]">
                      {item.dispenserFlow}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Lock Seal */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Lock className="w-3 h-3" />
                  <span>{item.status}</span>
                </span>
                <span className="text-slate-500">Auto-Cutoff ON</span>
              </div>
            </div>
          ))}
        </div>

        {/* System Integrity Certificate Banner */}
        <div className="mt-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold block">
                Electronic Point-of-Sale (e-POS) & Tank Calibration Interlock
              </span>
              <span className="text-slate-400 text-[11px]">
                Underground tanks are digitally interlocked with dispenser nozzles. If fuel density drifts outside government limits, delivery locks automatically.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Zero-Adulteration Lock</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
