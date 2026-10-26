import { useState, useEffect, useCallback } from 'react';
import { FuelRate, DEFAULT_RATES, DailyRevisionMeta, getAutomatedDailyFuelRates } from '../utils/fuelCalculations';

export function useFuelRates() {
  const [rates, setRates] = useState<FuelRate[]>(DEFAULT_RATES);
  const [meta, setMeta] = useState<DailyRevisionMeta>(getAutomatedDailyFuelRates().meta);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fuel-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.rates && data.meta) {
          setRates(data.rates);
          setMeta(data.meta);
          return;
        }
      }
      throw new Error('API returned invalid data');
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch fuel rates');
      const fallback = getAutomatedDailyFuelRates();
      setRates(fallback.rates);
      setMeta(fallback.meta);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();

    const handleUpdateEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.rates) {
        setRates(customEvent.detail.rates);
        if (customEvent.detail.meta) {
          setMeta(customEvent.detail.meta);
        }
      } else {
        fetchRates();
      }
    };

    window.addEventListener('fuel-rates-updated', handleUpdateEvent);
    return () => {
      window.removeEventListener('fuel-rates-updated', handleUpdateEvent);
    };
  }, [fetchRates]);

  const dieselPrice = rates.find((r) => r.id === 'diesel')?.price ?? 95.47;
  const petrolPrice = rates.find((r) => r.id === 'petrol')?.price ?? 101.92;
  const power95Price = rates.find((r) => r.id === 'power95')?.price ?? 104.50;
  const ureaPrice = rates.find((r) => r.id === 'def_urea')?.price ?? 65.00;

  return {
    rates,
    meta,
    isLoading,
    error,
    refreshRates: fetchRates,
    dieselPrice,
    petrolPrice,
    power95Price,
    ureaPrice,
  };
}
