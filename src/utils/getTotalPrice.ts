import { CartProductType } from '../redux/slices/cart/types';

export const getTotalPrice = (products: CartProductType[]) => {
  return products.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
