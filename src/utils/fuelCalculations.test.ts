import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFuelTripCost,
  calculateDefRequirement,
  formatCurrencyINR,
  isValidIndianMobile,
  validateFleetInquiry,
  getAutomatedDailyFuelRates,
  ALIGARH_UP_DIESEL_PRICE,
  ALIGARH_UP_PETROL_PRICE,
  ALIGARH_UP_POWER95_PRICE,
  ALIGARH_UP_UREA_PRICE,
  FIXED_DIESEL_PRICE,
  calculateLitresFromAmount,
  calculateAmountFromLitres,
  calculateFleetSavings,
  calculateTireUnderinflationLoss,
  calculateDensityAt15C,
  calculateHighwayRouteEstimate,
} from './fuelCalculations';

test('calculateFuelTripCost accurately computes liters and cost', () => {
  // 150 km at 15 km/l @ 90 Rs/L => 10 Liters => 900 Rs
  const result = calculateFuelTripCost(150, 15, 90);
  assert.equal(result.litersRequired, 10);
  assert.equal(result.estimatedCost, 900);
  assert.equal(result.costPerKm, 6);
});

test('calculateFuelTripCost handles zero or negative inputs cleanly', () => {
  const resultZero = calculateFuelTripCost(0, 15, 90);
  assert.equal(resultZero.litersRequired, 0);
  assert.equal(resultZero.estimatedCost, 0);

  const resultNegative = calculateFuelTripCost(-50, 15, 90);
  assert.equal(resultNegative.litersRequired, 0);
});

test('calculateDefRequirement computes 4.5% urea for diesel correctly', () => {
  // 1000 Liters diesel => 45 Liters DEF => 3 buckets of 20L
  const def = calculateDefRequirement(1000, 4.5);
  assert.equal(def.defLitersRequired, 45);
  assert.equal(def.defBuckets20L, 3);
});

test('isValidIndianMobile validates 10-digit Indian numbers properly', () => {
  assert.equal(isValidIndianMobile('7906103090'), true);
  assert.equal(isValidIndianMobile('+91 79061 03090'), true);
  assert.equal(isValidIndianMobile('+91 98765 43210'), true);
  assert.equal(isValidIndianMobile('12345'), false);
  assert.equal(isValidIndianMobile('5551234567'), false); // Starts with 5 (invalid Indian mobile)
});

test('validateFleetInquiry handles valid and invalid data', () => {
  const valid = validateFleetInquiry({
    fullName: 'Sharma Transport',
    phone: '7906103090',
    fuelType: 'diesel',
    quantityLiters: 500,
  });
  assert.equal(valid.isValid, true);

  const invalidPhone = validateFleetInquiry({
    fullName: 'Sharma Transport',
    phone: '123',
    fuelType: 'diesel',
    quantityLiters: 500,
  });
  assert.equal(invalidPhone.isValid, false);
  assert.equal(invalidPhone.error, 'Please enter a valid 10-digit mobile number.');
});

test('formatCurrencyINR formats Indian currency correctly', () => {
  assert.equal(formatCurrencyINR(1450), '₹1,450');
  assert.equal(formatCurrencyINR(95.47, true), '₹95.47');
});

test('getAutomatedDailyFuelRates sets fuel rates to Aligarh Uttar Pradesh benchmarks', () => {
  const { rates, meta } = getAutomatedDailyFuelRates();

  const diesel = rates.find((r) => r.id === 'diesel');
  assert.ok(diesel);
  assert.equal(diesel.price, ALIGARH_UP_DIESEL_PRICE); // 95.47
  assert.equal(diesel.price, FIXED_DIESEL_PRICE);
  assert.equal(diesel.isPriceFixed, true);

  const petrol = rates.find((r) => r.id === 'petrol');
  assert.ok(petrol);
  assert.equal(petrol.price, ALIGARH_UP_PETROL_PRICE); // 101.92

  const power95 = rates.find((r) => r.id === 'power95');
  assert.ok(power95);
  assert.equal(power95.price, ALIGARH_UP_POWER95_PRICE); // 104.50

  const urea = rates.find((r) => r.id === 'def_urea');
  assert.ok(urea);
  assert.equal(urea.price, ALIGARH_UP_UREA_PRICE); // 65.00

  assert.equal(meta.district, 'Aligarh, Uttar Pradesh');
  assert.equal(meta.isAutomated, true);
  assert.equal(meta.fixedDieselPrice, 95.47);
  assert.ok(meta.nextRevisionAt.includes('06:00 AM IST'));
});

test('calculateLitresFromAmount and calculateAmountFromLitres calculate inverse amounts accurately', () => {
  // ₹1000 @ ₹100/L => 10 Litres
  const fromRupees = calculateLitresFromAmount(1000, 100, 15);
  assert.equal(fromRupees.litres, 10);
  assert.equal(fromRupees.estimatedRangeKm, 150);

  // 10 Litres @ ₹100/L => ₹1000
  const fromLitres = calculateAmountFromLitres(10, 100);
  assert.equal(fromLitres.amount, 1000);
  assert.ok(fromLitres.formattedAmount.includes('1,000'));
});

test('calculateFleetSavings computes monthly diesel, rebate, and DEF urea', () => {
  // 10,000 Litres Diesel @ ₹95.47 => ₹954,700 gross
  const fleet = calculateFleetSavings(10000, 95.47, 0.75);
  assert.equal(fleet.grossExpense, 954700);
  assert.equal(fleet.rebateSavings, 7160);
  assert.equal(fleet.defRequiredLitres, 450);
});

test('calculateTireUnderinflationLoss calculates monthly and yearly wasted money', () => {
  const loss = calculateTireUnderinflationLoss(1000, 10, 95.47, 5);
  // 1000 km @ 10 kmpl = 100L. 5 PSI penalty @ 0.5%/PSI = 2.5% = 2.5L wasted
  assert.equal(loss.wastedLitres, 2.5);
  assert.ok(loss.monthlyMoneyWasted > 0);
  assert.equal(loss.yearlyMoneyWasted, loss.monthlyMoneyWasted * 12);
});

test('calculateDensityAt15C verifies ASTM standards for petrol and diesel', () => {
  // Diesel at 25°C observed 835 -> densityAt15C should be ~841.8, compliant
  const dieselTest = calculateDensityAt15C(835, 25, 'diesel');
  assert.equal(dieselTest.isCompliant, true);

  // Petrol at 30°C observed 730 -> compliant
  const petrolTest = calculateDensityAt15C(730, 30, 'petrol');
  assert.equal(petrolTest.isCompliant, true);
});

test('calculateHighwayRouteEstimate provides quick corridor trip estimates', () => {
  const estimate = calculateHighwayRouteEstimate(42, 'car_diesel');
  assert.ok(estimate.litresRequired > 0);
  assert.ok(estimate.totalCost > 0);
  assert.equal(estimate.fuelType, 'Diesel (Fixed)');
});

