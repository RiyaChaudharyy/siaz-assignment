export interface RangeDto {
  min?: number;
  max?: number;
  display?: boolean;
}

export interface ProductMeasurementDto {
  productSize?: string;
  chest?: number;
  waist?: number;
  hip?: number;
  length?: number;
  chestRange?: RangeDto;
  waistRange?: RangeDto;
  hipRange?: RangeDto;
  lengthRange?: RangeDto;
  heightRange?: RangeDto | null;
}

export interface ProductImageDto {
  src?: string;
}

export interface NudgeDto {
  text?: string;
  message?: string;
  direction?: string;
  type?: string;
}

export interface DisplayDto {
  chest?: boolean;
  waist?: boolean;
  hip?: boolean;
  length?: boolean;
}

export interface ProductDto {
  id?: string;
  brandCode?: string;
  productCode?: string;
  productName?: string;
  garmentType?: string;
  productGenderType?: string;

  isActive?: boolean;
  status?: string;

  productMeasurements?: ProductMeasurementDto[];
  productImages?: ProductImageDto[];
  display?: DisplayDto;

  nudges?: NudgeDto[];
  automatNudge?: NudgeDto | null;
  displayAutomatNudge?: boolean;

  sourceProductId?: string;
}
