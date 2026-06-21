import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../domain/models/Product';
import type { AppDeps } from '../deps';

export type ProductStatus = 'idle' | 'loading' | 'active' | 'inactive' | 'error';

export interface ProductState {
  status: ProductStatus;
  data: Product | null;
  error: string | null;
}

const initialState: ProductState = {
  status: 'idle',
  data: null,
  error: null,
};

export interface FetchProductArgs {
  brandCode: string;
  productCode: string;
}

export const fetchProduct = createAsyncThunk<
  Product,
  FetchProductArgs,
  { extra: AppDeps; rejectValue: string }
>('product/fetch', async ({ brandCode, productCode }, { extra, rejectWithValue }) => {
  try {
    return await extra.productService.getProduct(brandCode, productCode);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load product';
    return rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.data = action.payload;
        state.status = action.payload.isActive ? 'active' : 'inactive';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Failed to load product';
      });
  },
});

export const { reset: resetProduct } = productSlice.actions;
export default productSlice.reducer;
