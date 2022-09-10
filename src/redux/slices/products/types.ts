export type ProductType = {
  id: string;
  brandName: string;
  modelName: string;
  imageUrl: string;
  price: number;
  sizes: number[];
};

export enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface ProductsSliceState {
  items: ProductType[];
  status: Status;
}

export type SearchParams = {
  currentPage: string;
  search: string;
  category: string;
  sortBy: string;
  order: string;
};
