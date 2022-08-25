import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
};

const findProduct = (state, { id, size }) => {
  return state.products.find((obj) => obj.id === id && obj.size === size);
};

const getTotalPrice = (state) => {
  state.totalPrice = state.products.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const getTotalCount = (state) => {
  state.totalCount = state.products.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = findProduct(state, action.payload);

      if (product) {
        product.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      getTotalPrice(state);
      getTotalCount(state);
    },

    removeProduct: (state, action) => {
      const productToRemove = state.products.filter((obj) => {
        return obj.id === action.payload.id && obj.size === action.payload.size;
      });

      state.products = state.products.filter((obj) => obj !== productToRemove[0]);

      getTotalPrice(state);
      getTotalCount(state);
    },

    minusProduct: (state, action) => {
      const product = findProduct(state, action.payload);

      if (product.count > 1) product.count--;

      getTotalPrice(state);
      getTotalCount(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const cartProductsByIdSelector = (id) => (state) => {
  return state.cart.products.filter((obj) => obj.id === id);
};

export const { addProduct, removeProduct, minusProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
