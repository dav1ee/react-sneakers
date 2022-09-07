import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
