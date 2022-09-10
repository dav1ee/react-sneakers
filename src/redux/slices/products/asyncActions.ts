import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ProductType, SearchParams } from './types';

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
