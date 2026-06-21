import type { ProductApiResponse } from '../dto/ProductApiResponse';
import type { ProductService } from '../contracts/ProductService';

export class HttpProductService implements ProductService {
  async getProduct(
    brandCode: string,
    productCode: string,
  ): Promise<ProductApiResponse> {
    const response = await fetch(
      `/api/saiz/${encodeURIComponent(brandCode)}/${encodeURIComponent(productCode)}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Unable to load product. Status: ${response.status}`);
    }

    return response.json();
  }
}
