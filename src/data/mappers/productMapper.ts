import type { DisplayDto, NudgeDto, ProductDto, ProductMeasurementDto, RangeDto } from '../dto/ProductDto';
import type {
  FitProfile,
  MeasureKey,
  Product,
  ProductGender,
  ProductSize,
  SizeRange,
} from '../../domain/models/Product';

const toActive = (dto: ProductDto): boolean => {
  if (typeof dto.isActive === 'boolean') return dto.isActive;
  if (typeof dto.status === 'string') return dto.status.toLowerCase() === 'active';
  return false;
};

const toGender = (value?: string): ProductGender => {
  switch ((value ?? '').toLowerCase()) {
    case 'female':
      return 'female';
    case 'male':
      return 'male';
    default:
      return 'other';
  }
};

const toRange = (r?: RangeDto | null): SizeRange | undefined => {
  if (!r || r.display !== true) return undefined;
  const min = r.min ?? 0;
  const max = r.max ?? 0;
  return min === 0 && max === 0 ? undefined : { min, max };
};

const toSize = (m: ProductMeasurementDto): ProductSize => {
  const ranges: Partial<Record<MeasureKey, SizeRange>> = {};
  const chest = toRange(m.chestRange);
  const waist = toRange(m.waistRange);
  const hip = toRange(m.hipRange);
  const length = toRange(m.lengthRange);
  if (chest) ranges.chest = chest;
  if (waist) ranges.waist = waist;
  if (hip) ranges.hip = hip;
  if (length) ranges.length = length;

  return {
    label: m.productSize ?? '',
    chest: m.chest,
    waist: m.waist,
    hip: m.hip,
    length: m.length,
    ranges,
  };
};

const toDisplay = (d?: DisplayDto): Record<MeasureKey, boolean> => ({
  chest: d?.chest ?? false,
  waist: d?.waist ?? false,
  hip: d?.hip ?? false,
  length: d?.length ?? false,
});

const nudgeText = (n?: NudgeDto | null): string | undefined =>
  n ? (n.text ?? n.message ?? undefined) : undefined;

const toFit = (dto: ProductDto): { fitProfile: FitProfile; fitNote?: string } => {
  const candidates: (NudgeDto | null | undefined)[] = [dto.automatNudge, ...(dto.nudges ?? [])];
  for (const n of candidates) {
    const dir = (n?.direction ?? '').toLowerCase();
    const text = (nudgeText(n) ?? '').toLowerCase();
    if (dir.includes('small') || text.includes('smaller')) {
      return { fitProfile: 'small', fitNote: nudgeText(n) ?? 'Runs smaller than average' };
    }
    if (dir.includes('large') || text.includes('larger')) {
      return { fitProfile: 'large', fitNote: nudgeText(n) ?? 'Runs larger than average' };
    }
  }
  return { fitProfile: 'true' };
};

export const mapProduct = (
  dto: ProductDto,
  fallback: { brandCode: string; productCode: string },
): Product => {
  const { fitProfile, fitNote } = toFit(dto);
  return {
    id: dto.id ?? '',
    brandCode: dto.brandCode ?? fallback.brandCode,
    productCode: dto.productCode ?? fallback.productCode,
    name: dto.productName ?? fallback.productCode,
    garmentType: dto.garmentType ?? '',
    gender: toGender(dto.productGenderType),
    isActive: toActive(dto),
    sizes: (dto.productMeasurements ?? []).map(toSize).filter((s) => s.label.length > 0),
    display: toDisplay(dto.display),
    images: (dto.productImages ?? []).map((i) => i.src ?? '').filter((s) => s.length > 0),
    fitProfile,
    fitNote,
  };
};
