import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    type: SortEnum.RATING,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },

    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
