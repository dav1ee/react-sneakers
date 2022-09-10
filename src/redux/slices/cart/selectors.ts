import { RootState } from '../../store';

export const cartProductsByIdSelector = (id: string) => (state: RootState) => {
  return state.cart.products.filter((obj) => obj.id === id);
};

export const getCartSelector = (state: RootState) => {
  return state.cart;
};
