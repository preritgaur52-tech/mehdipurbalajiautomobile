import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-amber-950/95 text-amber-200 border border-amber-500/60 shadow-2xl backdrop-blur-md animate-fadeIn text-xs">
      <div className="flex items-center gap-2 font-medium">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        <span>Offline Mode — Official Aligarh Rates & Coordinates Cached</span>
      </div>
      <div className="flex items-center gap-1 font-mono text-[11px] text-amber-300 font-bold bg-amber-900/60 px-2 py-0.5 rounded">
        <Database className="w-3 h-3 text-amber-400" />
        <span>Local Shell</span>
      </div>
    </div>
  );
};
