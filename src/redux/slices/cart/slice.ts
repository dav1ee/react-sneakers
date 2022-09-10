import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartSliceState, CartProductType } from './types';

import { getCartFromLS } from '../../../utils/getCartFromLS';
import { getTotalPrice } from '../../../utils/getTotalPrice';
import { getTotalCount } from '../../../utils/getTotalCount';

const initialState: CartSliceState = getCartFromLS();

const findProduct = (state: CartSliceState, { id, size }: { id: string; size: number }) => {
  return state.products.find((obj) => obj.id === id && obj.size === size);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProductType>) => {
      const product = findProduct(state, action.payload);

      if (product) {
        product.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = getTotalPrice(state.products);
      state.totalCount = getTotalCount(state.products);
    },

    removeProduct: (state, action: PayloadAction<{ id: string; size: number }>) => {
      const productToRemove = state.products.filter((obj) => {
        return obj.id === action.payload.id && obj.size === action.payload.size;
      });

      state.products = state.products.filter((obj) => obj !== productToRemove[0]);

      state.totalPrice = getTotalPrice(state.products);
      state.totalCount = getTotalCount(state.products);
    },

    minusProduct: (state, action: PayloadAction<{ id: string; size: number }>) => {
      const product = findProduct(state, action.payload);

      if (product) {
        if (product.count > 1) product.count--;
      }

      state.totalPrice = getTotalPrice(state.products);
      state.totalCount = getTotalCount(state.products);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
