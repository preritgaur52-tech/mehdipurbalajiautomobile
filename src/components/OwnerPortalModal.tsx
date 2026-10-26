import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Check,
  AlertCircle,
  X,
  TrendingUp,
  BrainCircuit,
  History,
  KeyRound,
  SlidersHorizontal,
  Flame,
  Droplets,
  Layers,
  Pencil,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
import { FuelRate } from '../utils/fuelCalculations';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRates: FuelRate[];
  initialFuelId?: string;
  onRatesUpdated?: () => void;
}

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  currentRates,
  initialFuelId,
  onRatesUpdated,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form edit states
  const [dieselPrice, setDieselPrice] = useState<number>(95.47);
  const [petrolPrice, setPetrolPrice] = useState<number>(101.92);
  const [power95Price, setPower95Price] = useState<number>(104.50);
  const [ureaPrice, setUreaPrice] = useState<number>(65.00);
  const [updateNote, setUpdateNote] = useState('');
  const [newPin, setNewPin] = useState('');

  // Status states
  const [isSaving, setIsSaving] = useState(false);
  const [isScanningAI, setIsScanningAI] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [aiScanResult, setAiScanResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'rates' | 'ai_training' | 'history'>('rates');
  const [historyList, setHistoryList] = useState<any[]>([]);

  const [highlightedFuelId, setHighlightedFuelId] = useState<string | null>(null);

  // Initialize values from currentRates
  useEffect(() => {
    if (isOpen) {
      if (initialFuelId) {
        setHighlightedFuelId(initialFuelId);
        setActiveTab('rates');
      }
      const d = currentRates.find((r) => r.id === 'diesel')?.price ?? 95.47;
      const p = currentRates.find((r) => r.id === 'petrol')?.price ?? 101.92;
      const p95 = currentRates.find((r) => r.id === 'power95')?.price ?? 104.50;
      const u = currentRates.find((r) => r.id === 'def_urea')?.price ?? 65.00;
      setDieselPrice(d);
      setPetrolPrice(p);
      setPower95Price(p95);
      setUreaPrice(u);
      setSaveSuccess(null);
      setSaveError(null);
      setAiScanResult(null);

      // Check for saved session in this tab
      const savedAuth = sessionStorage.getItem('owner_authenticated');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        loadHistory();
      }
    }
  }, [isOpen, currentRates, initialFuelId]);

  const adjustRate = (setter: React.Dispatch<React.SetStateAction<number>>, delta: number) => {
    setter((prev) => Math.max(1, Math.round((prev + delta) * 100) / 100));
  };

  const applyPresetRates = (preset: 'aligarh_baseline' | 'round_half' | 'plus_10p' | 'minus_10p') => {
    if (preset === 'aligarh_baseline') {
      setDieselPrice(95.47);
      setPetrolPrice(101.92);
      setPower95Price(104.50);
      setUreaPrice(65.00);
      setUpdateNote('Reset to official Aligarh UP OMC baseline');
    } else if (preset === 'round_half') {
      setDieselPrice((p) => Math.round(p * 2) / 2);
      setPetrolPrice((p) => Math.round(p * 2) / 2);
      setPower95Price((p) => Math.round(p * 2) / 2);
      setUreaPrice((p) => Math.round(p * 2) / 2);
      setUpdateNote('Rounded prices to nearest 50 paise');
    } else if (preset === 'plus_10p') {
      adjustRate(setDieselPrice, 0.1);
      adjustRate(setPetrolPrice, 0.1);
      adjustRate(setPower95Price, 0.1);
      setUpdateNote('Daily +10 paise state OMC increment');
    } else if (preset === 'minus_10p') {
      adjustRate(setDieselPrice, -0.1);
      adjustRate(setPetrolPrice, -0.1);
      adjustRate(setPower95Price, -0.1);
      setUpdateNote('Daily -10 paise state OMC reduction');
    }
  };

  const loadHistory = async () => {
    try {
      const res = await fetch('/api/fuel-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.history) {
          setHistoryList(data.history);
        }
      }
    } catch {
      // Non-critical
    }
  };

  const handleVerifyPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin || pin.length < 4) {
      setAuthError('Please enter the 4-digit Owner PIN');
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('owner_authenticated', 'true');
        sessionStorage.setItem('owner_pin', pin);
        loadHistory();
      } else {
        setAuthError(data.error || 'Incorrect Passcode. Station owner access only.');
      }
    } catch {
      setAuthError('Unable to connect to server verification gate.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveAndRetrain = async () => {
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    const activePin = sessionStorage.getItem('owner_pin') || pin || '7906';

    try {
      const res = await fetch('/api/admin/fuel-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: activePin,
          diesel: dieselPrice,
          petrol: petrolPrice,
          power95: power95Price,
          def_urea: ureaPrice,
          note: updateNote || 'Owner daily calibration',
          newPin: newPin || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess('Prices updated & Gemini AI model successfully retrained!');
        if (newPin) {
          sessionStorage.setItem('owner_pin', newPin);
          setNewPin('');
        }
        // Broadcast custom event so whole app updates immediately
        window.dispatchEvent(
          new CustomEvent('fuel-rates-updated', {
            detail: { rates: data.rates },
          })
        );
        onRatesUpdated?.();
        loadHistory();
      } else {
        setSaveError(data.error || 'Failed to update rates.');
      }
    } catch {
      setSaveError('Network error while saving rates.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleScanWithAI = async (autoApply = false) => {
    setIsScanningAI(true);
    setSaveSuccess(null);
    setSaveError(null);

    const activePin = sessionStorage.getItem('owner_pin') || pin || '7906';

    try {
      const res = await fetch('/api/admin/ai-sync-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: activePin,
          autoApply,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAiScanResult(data);
        if (autoApply) {
          setDieselPrice(data.detectedRates.diesel);
          setPetrolPrice(data.detectedRates.petrol);
          setPower95Price(data.detectedRates.power95);
          setUreaPrice(data.detectedRates.def_urea);
          setSaveSuccess("Today's OMC rates applied & AI Model retrained automatically!");
          window.dispatchEvent(new CustomEvent('fuel-rates-updated'));
          onRatesUpdated?.();
          loadHistory();
        }
      } else {
        setSaveError(data.error || 'AI scan failed.');
      }
    } catch {
      setSaveError('Network error during AI scan.');
    } finally {
      setIsScanningAI(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('owner_authenticated');
    sessionStorage.removeItem('owner_pin');
    setIsAuthenticated(false);
    setPin('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto relative">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400">
              {isAuthenticated ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2">
                <span>Forecourt Master Console</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  Owner Portal
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Mehdipur Balaji Automobile · Fuel Price Master & AI Model Calibration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 hover:bg-slate-800 transition"
              >
                Lock
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              aria-label="Close owner portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Step 1: Security Passcode Gate */
          <div className="p-6 sm:p-8 space-y-6 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Owner Passcode Required</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your 4-digit station PIN to calibrate daily fuel rates and retrain the AI highway engine.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  autoFocus
                  className="w-48 mx-auto text-center tracking-[0.5em] text-2xl font-mono py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-blue-500 shadow-inner"
                />
                <div className="text-[11px] text-slate-500 mt-2">
                  Station Master PIN: <span className="font-mono text-slate-400">7906</span> (Default)
                </div>
              </div>

              {authError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-950/60 p-2.5 rounded-xl border border-rose-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || pin.length < 4}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Master Credentials...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Owner Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Full Owner Control Room Dashboard */
          <div className="p-4 sm:p-6 space-y-5">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('rates')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'rates'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Daily Rates Calibration</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ai_training')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'ai_training'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI Auto-Sync & Training</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Audit Log</span>
              </button>
            </div>

            {/* Notifications */}
            {saveSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveSuccess}</span>
              </div>
            )}
            {saveError && (
              <div className="p-3 bg-rose-950/80 border border-rose-700 text-rose-200 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            {/* TAB 1: Fuel Rates Calibration */}
            {activeTab === 'rates' && (
              <div className="space-y-4">
                {/* Manual Calibration Header & Quick Preset Bar */}
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                      <span>Manual Fuel Rate Calibration & Override</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Type exact price or tap ± quick steppers
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => applyPresetRates('aligarh_baseline')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800/70 transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Aligarh Baseline (D: ₹95.47 · P: ₹101.92)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetRates('plus_10p')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
                    >
                      +10 Paise All
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetRates('minus_10p')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
                    >
                      -10 Paise All
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetRates('round_half')}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
                    >
                      Round to ₹0.50
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Diesel */}
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 border transition-all space-y-2.5 ${
                      highlightedFuelId === 'diesel'
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-blue-400" />
                        <span>High Speed Diesel (HSD)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Dealer Fixed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={dieselPrice}
                        onChange={(e) => setDieselPrice(parseFloat(e.target.value) || 0)}
                        className="w-full text-xl font-mono font-extrabold bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-xs text-slate-400 font-mono">/L</span>
                    </div>
                    {/* Steppers */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => adjustRate(setDieselPrice, -0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.50
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setDieselPrice, -0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setDieselPrice, 0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setDieselPrice, 0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.50
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">Benchmark: Aligarh UP Corridor</div>
                  </div>

                  {/* Petrol */}
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 border transition-all space-y-2.5 ${
                      highlightedFuelId === 'petrol'
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>Motor Spirit (Petrol / MS)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                        06:00 AM Sync
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={petrolPrice}
                        onChange={(e) => setPetrolPrice(parseFloat(e.target.value) || 0)}
                        className="w-full text-xl font-mono font-extrabold bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-xs text-slate-400 font-mono">/L</span>
                    </div>
                    {/* Steppers */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => adjustRate(setPetrolPrice, -0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.50
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPetrolPrice, -0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPetrolPrice, 0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPetrolPrice, 0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.50
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">OMC Aligarh District Benchmark</div>
                  </div>

                  {/* Power 95 */}
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 border transition-all space-y-2.5 ${
                      highlightedFuelId === 'power95'
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>HP Power 95 (Premium)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                        High Octane
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={power95Price}
                        onChange={(e) => setPower95Price(parseFloat(e.target.value) || 0)}
                        className="w-full text-xl font-mono font-extrabold bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-xs text-slate-400 font-mono">/L</span>
                    </div>
                    {/* Steppers */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => adjustRate(setPower95Price, -0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.50
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPower95Price, -0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPower95Price, 0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setPower95Price, 0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.50
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">Premium additive friction modifier</div>
                  </div>

                  {/* DEF Urea */}
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 border transition-all space-y-2.5 ${
                      highlightedFuelId === 'def_urea'
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span>HP DEF Urea (AUS 32)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        ISO 22241
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        value={ureaPrice}
                        onChange={(e) => setUreaPrice(parseFloat(e.target.value) || 0)}
                        className="w-full text-xl font-mono font-extrabold bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-xs text-slate-400 font-mono">/L</span>
                    </div>
                    {/* Steppers */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => adjustRate(setUreaPrice, -0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.50
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setUreaPrice, -0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        -0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setUreaPrice, 0.1)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.10
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustRate(setUreaPrice, 0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono font-bold border border-slate-800 transition active:scale-95"
                      >
                        +0.50
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">BS-VI Commercial truck stock</div>
                  </div>
                </div>

                {/* Optional note and PIN update */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Update Note / Reason (Optional)
                    </label>
                    <input
                      type="text"
                      value={updateNote}
                      onChange={(e) => setUpdateNote(e.target.value)}
                      placeholder="e.g., Morning 06:00 AM calibration"
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Change Owner PIN (Optional)
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new 4-digit PIN"
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Save and retrain button */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveAndRetrain}
                    disabled={isSaving}
                    className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/40 transition active:scale-95"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Applying & Retraining AI Model...</span>
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="w-4 h-4" />
                        <span>Save Prices & Retrain AI Highway Model</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScanWithAI(false)}
                    disabled={isScanningAI}
                    className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    {isScanningAI ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    )}
                    <span>AI Live Scan</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AI Auto-Sync & Training Deep Dive */}
            {activeTab === 'ai_training' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-950 border border-blue-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                    <BrainCircuit className="w-4 h-4 text-blue-400" />
                    <span>Gemini Forecourt Intelligence & Price Training Status</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The AI Assistant in the website and voice player uses dynamic instruction injection. Whenever you modify prices or trigger an AI scan, the system instruction memory is updated in real time.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[9px]">DIESEL</span>
                      <span className="font-bold text-white">₹{dieselPrice.toFixed(2)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[9px]">PETROL</span>
                      <span className="font-bold text-white">₹{petrolPrice.toFixed(2)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[9px]">POWER 95</span>
                      <span className="font-bold text-white">₹{power95Price.toFixed(2)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <span className="text-slate-500 block text-[9px]">DEF UREA</span>
                      <span className="font-bold text-white">₹{ureaPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* AI Search Scanner */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>Scan Official OMC Rates (Aligarh / UP) with Google Search</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleScanWithAI(false)}
                      disabled={isScanningAI}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      {isScanningAI ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      <span>Fetch Live UP Rates</span>
                    </button>
                  </div>

                  {aiScanResult && (
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-400">Scan Summary:</span>
                        <span className="text-[10px] text-slate-400">{aiScanResult.summary}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 bg-slate-950 rounded-lg">
                          <span className="text-slate-500 block">Detected Diesel:</span>
                          <span className="font-bold text-emerald-400">₹{aiScanResult.detectedRates.diesel}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg">
                          <span className="text-slate-500 block">Detected Petrol:</span>
                          <span className="font-bold text-blue-400">₹{aiScanResult.detectedRates.petrol}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleScanWithAI(true)}
                        disabled={isScanningAI}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Auto-Apply Detected Rates & Retrain AI</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: History & Audit Log */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recent Fuel Price Adjustments & AI Retraining Events</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {historyList.length === 0 ? (
                    <div className="text-xs text-slate-500 p-4 text-center bg-slate-950 rounded-xl">
                      No updates recorded yet. The system is operating on initial baseline rates.
                    </div>
                  ) : (
                    historyList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-200">
                            Diesel: ₹{item.diesel} · Petrol: ₹{item.petrol}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.note || 'Calibration'} · By: <span className="text-slate-400 font-semibold">{item.updatedBy}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono text-right">
                          {new Date(item.timestamp).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
