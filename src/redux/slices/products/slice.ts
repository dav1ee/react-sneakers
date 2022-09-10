import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from './asyncActions';
import { ProductsSliceState, Status } from './types';

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
