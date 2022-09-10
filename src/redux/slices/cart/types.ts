export type CartProductType = {
  id: string;
  modelName: string;
  imageUrl: string;
  price: number;
  size: number;
  count: number;
};

export interface CartSliceState {
  products: CartProductType[];
  totalPrice: number;
  totalCount: number;
}
