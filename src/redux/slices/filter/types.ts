export enum SortEnum {
  RATING = 'rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortType = {
  name: string;
  type: SortEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortType;
}
