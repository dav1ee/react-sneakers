import { getTotalCount } from './getTotalCount';
import { getTotalPrice } from './getTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const products = data ? JSON.parse(data) : [];

  return {
    products,
    totalPrice: getTotalPrice(products),
    totalCount: getTotalCount(products),
  };
};
