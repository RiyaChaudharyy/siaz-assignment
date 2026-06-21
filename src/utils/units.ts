import type { Unit } from '../domain/models/Measurements';

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;

const round = (n: number) => Math.round(n);

export const convertWeight = (value: number, from: Unit, to: Unit): number => {
  if (from === to) return value;
  return to === 'in' ? round(value / KG_PER_LB) : round(value * KG_PER_LB);
};

export const convertHeight = (value: number, from: Unit, to: Unit): number => {
  if (from === to) return value;
  return to === 'in' ? round(value / CM_PER_IN) : round(value * CM_PER_IN);
};

export interface UnitLabels {
  weight: 'kg' | 'lb';
  height: 'cm' | 'in';
}

export const unitLabels = (unit: Unit): UnitLabels =>
  unit === 'cm' ? { weight: 'kg', height: 'cm' } : { weight: 'lb', height: 'in' };

export interface Range {
  min: number;
  max: number;
}

export interface MeasurementRanges {
  age: Range;
  weight: Range;
  height: Range;
}

export const rangeFor = (unit: Unit): MeasurementRanges =>
  unit === 'cm'
    ? { age: { min: 14, max: 90 }, weight: { min: 40, max: 160 }, height: { min: 130, max: 215 } }
    : { age: { min: 14, max: 90 }, weight: { min: 88, max: 352 }, height: { min: 51, max: 85 } };

export const clamp = (value: number, range: Range): number =>
  Math.min(range.max, Math.max(range.min, value));
