export interface SizeRange {
  min: number;
  max: number;
}

export type MeasureKey = 'chest' | 'waist' | 'hip' | 'length';

export interface ProductSize {
  label: string;
  chest?: number;
  waist?: number;
  hip?: number;
  length?: number;
  ranges: Partial<Record<MeasureKey, SizeRange>>;
}

export type FitProfile = 'small' | 'true' | 'large';
export type ProductGender = 'male' | 'female' | 'other';

export interface Product {
  id: string;
  brandCode: string;
  productCode: string;
  name: string;
  garmentType: string;
  gender: ProductGender;
  isActive: boolean;
  sizes: ProductSize[];
  display: Record<MeasureKey, boolean>;
  images: string[];
  fitProfile: FitProfile;
  fitNote?: string;
}
