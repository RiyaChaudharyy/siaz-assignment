import type { ProductService } from '../../domain/ports/ProductService';
import type { Product } from '../../domain/models/Product';
import type { ProductDto } from '../dto/ProductDto';
import { mapProduct } from '../mappers/productMapper';

export class HttpProductService implements ProductService {
  async getProduct(brandCode: string, productCode: string): Promise<Product> {
    const res = await fetch(
      `/api/saiz/${encodeURIComponent(brandCode)}/${encodeURIComponent(productCode)}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Request failed (${res.status} ${res.statusText})`);
    }

    const dto = (await res.json()) as ProductDto;

    return mapProduct(dto, { brandCode, productCode });
  }
}
