import type { Product } from '../models/Product';

export interface ProductService {
  getProduct(brandCode: string, productCode: string): Promise<Product>;
}
