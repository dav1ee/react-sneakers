import { CartProductType } from '../redux/slices/cart/types';

export const getTotalCount = (products: CartProductType[]) => {
  return products.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};
