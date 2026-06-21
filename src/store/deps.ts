import type { ProductService } from '../domain/ports/ProductService';

export interface AppDeps {
  productService: ProductService;
}
