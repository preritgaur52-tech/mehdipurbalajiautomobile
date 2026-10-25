import React, { useState } from 'react';
import { X, Globe, Sparkles, Check, Copy, ArrowRight, ShieldCheck, Terminal, UploadCloud } from 'lucide-react';

interface GoogleHostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleHostingGuideModal: React.FC<GoogleHostingGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
          aria-label="Close guide modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 w-fit">
            <UploadCloud className="w-4 h-4 text-emerald-600" />
            <span>100% Free Google Official Hosting Guide</span>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              How to Upload This Website on Google for Free
            </h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Google provides <strong>Google Firebase Hosting</strong> (and Google Cloud), which gives you 
              <strong> 100% free hosting forever</strong> with global Google CDN, free SSL security (HTTPS), and custom domain support.
            </p>
          </div>

          {/* 3 Simple Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Step 1 · Build the Production Files
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Run this command in your project terminal to generate the lightning-fast HTML/CSS/JS package:
              </p>
              <div className="bg-slate-900 text-slate-200 text-xs font-mono p-3 rounded-lg flex items-center justify-between">
                <code>npm run build</code>
                <button
                  onClick={() => copyCommand('npm run build', 1)}
                  className="p-1 hover:text-white text-slate-400"
                  title="Copy command"
                >
                  {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Creates a production-ready <code className="text-slate-700 font-bold">dist/</code> directory.</span>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Step 2 · Install Google Firebase Tools & Login
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Install the official Google Firebase CLI (free) and log in with your Google account:
              </p>
              <div className="bg-slate-900 text-slate-200 text-xs font-mono p-3 rounded-lg flex items-center justify-between">
                <code>npm install -g firebase-tools && firebase login</code>
                <button
                  onClick={() => copyCommand('npm install -g firebase-tools && firebase login', 2)}
                  className="p-1 hover:text-white text-slate-400"
                  title="Copy command"
                >
                  {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-500">Opens your browser to sign in with your Google Account for free.</span>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Step 3 · Deploy Directly to Google Cloud
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Initialize Firebase Hosting and deploy with one command:
              </p>
              <div className="bg-slate-900 text-slate-200 text-xs font-mono p-3 rounded-lg flex items-center justify-between">
                <code>firebase init hosting && firebase deploy</code>
                <button
                  onClick={() => copyCommand('firebase init hosting && firebase deploy', 3)}
                  className="p-1 hover:text-white text-slate-400"
                  title="Copy command"
                >
                  {copiedIndex === 3 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[11px] text-slate-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                When asked for public directory, type <strong className="text-emerald-800">dist</strong> and answer <strong className="text-emerald-800">Yes (y)</strong> to single-page app!
              </div>
            </div>
          </div>

          {/* Google Benefits */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              What you get for FREE from Google:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Free permanent <code>.web.app</code> domain</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Free SSL Certificate (HTTPS green lock)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Google Cloud Global CDN (fast speeds)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Link free custom domain anytime</span>
              </div>
            </div>
          </div>

          {/* Linking with Google Maps & Search */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
            <h5 className="font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-700" />
              <span>Link with Google Business Profile & Google Maps</span>
            </h5>
            <p className="text-blue-800 text-[11px] leading-relaxed">
              Once deployed, paste your free Google URL into your <strong>Google Business Profile (Google Maps Listing)</strong> under the "Website" field. This allows travelers on Google Maps to click directly into your website for live rates, calculators, and services!
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-all"
            >
              Got It, Thank You!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
