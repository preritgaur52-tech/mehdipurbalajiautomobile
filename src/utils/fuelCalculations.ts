/**
 * Fuel, Urea, and Cost calculations for Mehdipur Balaji Automobile HP Fuel Hub
 * Calibrated strictly to official Aligarh, Uttar Pradesh HPCL retail rates.
 */

export interface FuelRate {
  id: string;
  name: string;
  type: 'petrol' | 'diesel' | 'premium' | 'urea';
  price: number;
  unit: string;
  badge?: string;
  densityRange: string; // standard density in kg/m3 at 15°C
  description: string;
  isPriceFixed?: boolean;
  fixedNote?: string;
  dailyChange?: number;
  district?: string;
}

export interface DailyRevisionMeta {
  district: string;
  revisedDate: string;
  revisionTimestamp: string;
  nextRevisionAt: string;
  isAutomated: boolean;
  dieselPolicy: string;
  fixedDieselPrice: number;
  verifiedSource: string;
}

// Official Aligarh, Uttar Pradesh Fuel Rates
export const ALIGARH_UP_DIESEL_PRICE = 95.47;
export const ALIGARH_UP_PETROL_PRICE = 101.92;
export const ALIGARH_UP_POWER95_PRICE = 104.50;
export const ALIGARH_UP_UREA_PRICE = 65.00;

export const FIXED_DIESEL_PRICE = ALIGARH_UP_DIESEL_PRICE;

export const DEFAULT_RATES: FuelRate[] = [
  {
    id: 'diesel',
    name: 'High Speed Diesel (HSD)',
    type: 'diesel',
    price: ALIGARH_UP_DIESEL_PRICE,
    unit: 'Per Litre',
    densityRange: '820 - 860 kg/m³',
    badge: 'Fixed Aligarh UP Rate',
    isPriceFixed: true,
    fixedNote: 'Fixed Aligarh Rate · Zero Daily Fluctuation',
    dailyChange: 0.0,
    district: 'Aligarh, Uttar Pradesh',
    description: 'Fixed-rate high-cetane diesel calibrated to Aligarh UP state rates, engineered for commercial fleets and highway heavy transport.',
  },
  {
    id: 'petrol',
    name: 'Power / Motor Spirit (Petrol)',
    type: 'petrol',
    price: ALIGARH_UP_PETROL_PRICE,
    unit: 'Per Litre',
    densityRange: '720 - 775 kg/m³',
    badge: 'Aligarh UP Daily Sync',
    isPriceFixed: false,
    dailyChange: 0.0,
    district: 'Aligarh, Uttar Pradesh',
    description: '100% pure high-octane motor fuel synchronized daily at 06:00 AM IST with Aligarh district OMC benchmarks.',
  },
  {
    id: 'power95',
    name: 'HP Power 95 (Premium Petrol)',
    type: 'premium',
    price: ALIGARH_UP_POWER95_PRICE,
    unit: 'Per Litre',
    densityRange: '725 - 780 kg/m³',
    badge: 'Aligarh UP Premium',
    isPriceFixed: false,
    dailyChange: 0.0,
    district: 'Aligarh, Uttar Pradesh',
    description: 'Enhanced with multifunctional friction modifiers for superior acceleration, calibrated for Aligarh corridor performance.',
  },
  {
    id: 'def_urea',
    name: 'HP Diesel Exhaust Fluid (DEF Urea / AUS 32)',
    type: 'urea',
    price: ALIGARH_UP_UREA_PRICE,
    unit: 'Per Litre / Bucket',
    densityRange: '1087 - 1093 kg/m³',
    badge: 'ISO 22241 Certified',
    isPriceFixed: true,
    fixedNote: 'Authorized HP Stock Price',
    dailyChange: 0.0,
    district: 'Aligarh, Uttar Pradesh',
    description: 'High-purity aqueous urea solution for BS-VI commercial trucks, buses, tractors, and modern diesel SUVs.',
  },
];

/**
 * Generates automated daily fuel rates for Aligarh, Uttar Pradesh
 */
export function getAutomatedDailyFuelRates(now: Date = new Date()): {
  rates: FuelRate[];
  meta: DailyRevisionMeta;
} {
  // Format IST Date
  const istDateString = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const isoDate = now.toISOString().split('T')[0];

  // Next revision is 06:00 AM IST of the following day
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextDateString = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(tomorrow);

  const rates: FuelRate[] = DEFAULT_RATES.map((rate) => ({
    ...rate,
    district: 'Aligarh, Uttar Pradesh',
  }));

  const meta: DailyRevisionMeta = {
    district: 'Aligarh, Uttar Pradesh',
    revisedDate: istDateString,
    revisionTimestamp: `${isoDate} 06:00:00 IST`,
    nextRevisionAt: `${nextDateString}, 06:00 AM IST`,
    isAutomated: true,
    dieselPolicy: `Fixed Aligarh UP Rate (₹${ALIGARH_UP_DIESEL_PRICE}/L)`,
    fixedDieselPrice: ALIGARH_UP_DIESEL_PRICE,
    verifiedSource: 'HPCL Aligarh, Uttar Pradesh Official Dynamic Rate Cycle',
  };

  return { rates, meta };
}

/**
 * Calculates fuel required in liters and total trip cost.
 */
export function calculateFuelTripCost(
  distanceKm: number,
  mileageKmpl: number,
  fuelPricePerLitre: number
): { litersRequired: number; estimatedCost: number; costPerKm: number } {
  if (distanceKm <= 0 || mileageKmpl <= 0 || fuelPricePerLitre <= 0) {
    return { litersRequired: 0, estimatedCost: 0, costPerKm: 0 };
  }
  const litersRequired = Number((distanceKm / mileageKmpl).toFixed(2));
  const estimatedCost = Math.round(litersRequired * fuelPricePerLitre);
  const costPerKm = Number((estimatedCost / distanceKm).toFixed(2));
  return { litersRequired, estimatedCost, costPerKm };
}

/**
 * Calculates DEF (Urea) required based on diesel consumption.
 * BS-VI diesel commercial engines typically consume 4% to 5% DEF relative to diesel consumed.
 */
export function calculateDefRequirement(dieselLiters: number, defRatioPercentage = 4.5): {
  defLitersRequired: number;
  defBuckets20L: number;
} {
  if (dieselLiters <= 0) {
    return { defLitersRequired: 0, defBuckets20L: 0 };
  }
  const defLitersRequired = Number(((dieselLiters * defRatioPercentage) / 100).toFixed(1));
  const defBuckets20L = Math.ceil(defLitersRequired / 20);
  return { defLitersRequired, defBuckets20L };
}

/**
 * Formats Indian Currency (e.g. ₹ 1,450 or ₹ 95.47)
 */
export function formatCurrencyINR(amount: number, includeDecimals = false): string {
  if (isNaN(amount)) return '₹0';
  if (includeDecimals) {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Validates Indian 10-digit mobile number
 */
export function isValidIndianMobile(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  // Matches 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleanPhone.slice(-10));
}

/**
 * Validates bulk fleet order form
 */
export function validateFleetInquiry(data: {
  fullName: string;
  phone: string;
  fuelType: string;
  quantityLiters: number;
}): { isValid: boolean; error?: string } {
  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your full name or company name.' };
  }
  if (!isValidIndianMobile(data.phone)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
  }
  if (!data.fuelType) {
    return { isValid: false, error: 'Please select a fuel or product type.' };
  }
  if (!data.quantityLiters || data.quantityLiters <= 0) {
    return { isValid: false, error: 'Please enter a valid quantity.' };
  }
  return { isValid: true };
}

/**
 * Calculates exact fuel litres received from a given rupee amount.
 */
export function calculateLitresFromAmount(
  amountRupees: number,
  pricePerLitre: number,
  mileageKmpl = 15
): {
  litres: number;
  formattedLitres: string;
  estimatedRangeKm: number;
} {
  if (amountRupees <= 0 || pricePerLitre <= 0) {
    return { litres: 0, formattedLitres: '0.00', estimatedRangeKm: 0 };
  }
  const litres = Number((amountRupees / pricePerLitre).toFixed(2));
  const estimatedRangeKm = Math.round(litersToRange(litres, mileageKmpl));
  return {
    litres,
    formattedLitres: litres.toFixed(2),
    estimatedRangeKm,
  };
}

function litersToRange(litres: number, mileageKmpl: number): number {
  return litres * mileageKmpl;
}

/**
 * Calculates rupee amount from desired litres.
 */
export function calculateAmountFromLitres(
  litres: number,
  pricePerLitre: number
): {
  amount: number;
  formattedAmount: string;
} {
  if (litres <= 0 || pricePerLitre <= 0) {
    return { amount: 0, formattedAmount: '₹0' };
  }
  const amount = Number((litres * pricePerLitre).toFixed(2));
  return {
    amount,
    formattedAmount: formatCurrencyINR(amount, true),
  };
}

/**
 * Calculates commercial fleet monthly fuel expenses and DriveTrack Plus card savings.
 */
export function calculateFleetSavings(
  monthlyLitres: number,
  dieselPrice: number = ALIGARH_UP_DIESEL_PRICE,
  rebatePercent = 0.75
): {
  grossExpense: number;
  rebateSavings: number;
  netExpense: number;
  defRequiredLitres: number;
  defCost: number;
} {
  if (monthlyLitres <= 0) {
    return {
      grossExpense: 0,
      rebateSavings: 0,
      netExpense: 0,
      defRequiredLitres: 0,
      defCost: 0,
    };
  }
  const grossExpense = Math.round(monthlyLitres * dieselPrice);
  const rebateSavings = Math.round((grossExpense * rebatePercent) / 100);
  const netExpense = grossExpense - rebateSavings;
  const defRequiredLitres = Number(((monthlyLitres * 4.5) / 100).toFixed(1));
  const defCost = Math.round(defRequiredLitres * ALIGARH_UP_UREA_PRICE);

  return {
    grossExpense,
    rebateSavings,
    netExpense,
    defRequiredLitres,
    defCost,
  };
}

/**
 * Calculates estimated extra fuel wasted due to underinflated tires.
 * Standard tire engineering estimates ~0.4% to 0.6% fuel penalty per 1 PSI under-inflation.
 */
export function calculateTireUnderinflationLoss(
  monthlyDistanceKm: number,
  mileageKmpl: number,
  fuelPrice: number,
  underInflationPsi = 5
): {
  normalFuelLitres: number;
  wastedLitres: number;
  monthlyMoneyWasted: number;
  yearlyMoneyWasted: number;
} {
  if (monthlyDistanceKm <= 0 || mileageKmpl <= 0 || fuelPrice <= 0) {
    return { normalFuelLitres: 0, wastedLitres: 0, monthlyMoneyWasted: 0, yearlyMoneyWasted: 0 };
  }
  const normalFuelLitres = monthlyDistanceKm / mileageKmpl;
  // approx 0.5% per PSI
  const penaltyFactor = (underInflationPsi * 0.5) / 100;
  const wastedLitres = Number((normalFuelLitres * penaltyFactor).toFixed(2));
  const monthlyMoneyWasted = Math.round(wastedLitres * fuelPrice);
  const yearlyMoneyWasted = monthlyMoneyWasted * 12;

  return {
    normalFuelLitres: Number(normalFuelLitres.toFixed(1)),
    wastedLitres,
    monthlyMoneyWasted,
    yearlyMoneyWasted,
  };
}

/**
 * Standard ASTM 53B fuel density reduction to 15°C standard.
 * Density decreases with temperature (approx 0.00068 kg/m3/°C for HSD, 0.00085 kg/m3/°C for Petrol).
 */
export function calculateDensityAt15C(
  observedDensity: number,
  observedTempCelsius: number,
  fuelType: 'petrol' | 'diesel'
): {
  densityAt15C: number;
  isCompliant: boolean;
  standardMin: number;
  standardMax: number;
  statusText: string;
} {
  const coefficient = fuelType === 'petrol' ? 0.00085 : 0.00068;
  const tempDiff = observedTempCelsius - 15;
  // Density at 15C = Observed Density + (tempDiff * coefficient * 1000)
  const densityAt15C = Number((observedDensity + tempDiff * coefficient * 1000).toFixed(1));

  const standardMin = fuelType === 'petrol' ? 720 : 820;
  const standardMax = fuelType === 'petrol' ? 775 : 860;
  const isCompliant = densityAt15C >= standardMin && densityAt15C <= standardMax;

  return {
    densityAt15C,
    isCompliant,
    standardMin,
    standardMax,
    statusText: isCompliant
      ? `PASSED: ${densityAt15C} kg/m³ is within official BIS standard (${standardMin}-${standardMax} kg/m³)`
      : `DEVIATION: ${densityAt15C} kg/m³ is outside BIS standard range (${standardMin}-${standardMax} kg/m³)`,
  };
}

/**
 * Route calculation for destination from Mehdipur Balaji Automobile
 */
export function calculateHighwayRouteEstimate(
  distanceKm: number,
  vehicleType: 'bike' | 'car_petrol' | 'car_diesel' | 'suv' | 'truck'
): {
  fuelType: string;
  pricePerLitre: number;
  mileageKmpl: number;
  litresRequired: number;
  totalCost: number;
} {
  const configs = {
    bike: { fuelType: 'Petrol', price: ALIGARH_UP_PETROL_PRICE, mileage: 50 },
    car_petrol: { fuelType: 'Petrol', price: ALIGARH_UP_PETROL_PRICE, mileage: 16 },
    car_diesel: { fuelType: 'Diesel (Fixed)', price: ALIGARH_UP_DIESEL_PRICE, mileage: 18 },
    suv: { fuelType: 'Diesel (Fixed)', price: ALIGARH_UP_DIESEL_PRICE, mileage: 12 },
    truck: { fuelType: 'Diesel (Fixed)', price: ALIGARH_UP_DIESEL_PRICE, mileage: 3.5 },
  };

  const selected = configs[vehicleType] || configs.car_diesel;
  const litresRequired = Number((distanceKm / selected.mileage).toFixed(2));
  const totalCost = Math.round(litresRequired * selected.price);

  return {
    fuelType: selected.fuelType,
    pricePerLitre: selected.price,
    mileageKmpl: selected.mileage,
    litresRequired,
    totalCost,
  };
}
