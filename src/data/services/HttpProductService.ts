import type { ProductService } from '../../domain/ports/ProductService';
import type { Product } from '../../domain/models/Product';
import type { ProductDto } from '../dto/ProductDto';
import { mapProduct } from '../mappers/productMapper';

export interface HttpProductServiceOptions {
  baseUrl: string;
  apiKey: string;
}

export class HttpProductService implements ProductService {
  constructor(private readonly options: HttpProductServiceOptions) {}

  async getProduct(brandCode: string, productCode: string): Promise<Product> {
    const path = `/api/Product/GetProductForWidget/${encodeURIComponent(brandCode)}/${encodeURIComponent(productCode)}`;
    const res = await fetch(`${this.options.baseUrl}${path}`, {
      headers: { Accept: 'application/json', 'SAIZ-API-KEY': this.options.apiKey },
    });
    if (!res.ok) {
      throw new Error(`Request failed (${res.status} ${res.statusText})`);
    }
    const dto = (await res.json()) as ProductDto;
    return mapProduct(dto, { brandCode, productCode });
  }
}
