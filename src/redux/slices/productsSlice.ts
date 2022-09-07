import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type ProductType = {
  id: string;
  brandName: string;
  modelName: string;
  imageUrl: string;
  price: number;
  sizes: number[];
};

export enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

interface ProductsSliceState {
  items: ProductType[];
  status: Status;
}

export type SearchParams = {
  currentPage: string;
  search: string;
  category: string;
  sortBy: string;
  order: string;
};

export const fetchProducts = createAsyncThunk<ProductType[], SearchParams>(
  'products/fetchStatus',
  async (params) => {
    const { currentPage, search, category, sortBy, order } = params;

    const { data } = await axios.get<ProductType[]>(
      `https://62f25d0e18493ca21f32200f.mockapi.io/items?page=${currentPage}&limit=8&${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
    );

    return data;
  },
);

const initialState: ProductsSliceState = {
  items: [],
  status: Status.PENDING,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.status = Status.PENDING;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.FULFILLED;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.status = Status.REJECTED;
    });
  },
});

export default productsSlice.reducer;
