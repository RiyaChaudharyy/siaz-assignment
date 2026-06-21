export type Unit = 'cm' | 'in';
export type Gender = 'male' | 'female' | 'other';

export interface Measurements {
  unit: Unit;
  gender: Gender;
  age: number;
  weight: number;
  height: number;
}
