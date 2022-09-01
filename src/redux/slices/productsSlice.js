import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchStatus', async (params) => {
  const { currentPage, search, category, sortBy, order } = params;

  const { data } = await axios.get(
    `https://62f25d0e18493ca21f32200f.mockapi.io/items?page=${currentPage}&limit=8&${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
  );

  return data;
});

const initialState = {
  items: [],
  status: 'pending', // pending | fulfilled | rejected
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.items = [];
      state.status = 'pending';
    },

    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    },

    [fetchProducts.rejected]: (state) => {
      state.items = [];
      state.status = 'rejected';
    },
  },
});

export default productsSlice.reducer;
