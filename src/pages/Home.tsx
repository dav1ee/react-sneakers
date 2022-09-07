import { FC, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories, { categories } from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

import {
  SortType,
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { ProductType, SearchParams, fetchProducts } from '../redux/slices/productsSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.products);

  const products = items.map((obj: ProductType) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onSetCategoryId = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onSetSort = useCallback((obj: SortType) => {
    dispatch(setSort(obj));
  }, []);
  const onSetCurrentPage = (page: number) => dispatch(setCurrentPage(page));

  const getProducts = async () => {
    const search = searchValue ? `modelName=${searchValue}` : '';
    const category = categoryId > 0 ? String(categoryId) : '';
    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'asc' : 'desc';

    dispatch(
      fetchProducts({
        currentPage: String(currentPage),
        search,
        category,
        sortBy,
        order,
      }),
    );
  };

  // Сохранение параметров в URL
  useEffect(() => {
    // Фикс вшития при первом рендере
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortBy: sort.type,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [currentPage, categoryId, sort]);

  // Сохранение параметров (если они есть) в редакс после первого рендера
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParams;
      const sort = sortList.find((obj) => obj.type === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Выполнение запроса, если был первый рендер. +фикс лишнего запроса
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getProducts();
    }

    isSearch.current = false;
  }, [currentPage, searchValue, categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onSetCategoryId={onSetCategoryId} />
        <Sort sort={sort} onSetSort={onSetSort} />
      </div>
      {status !== 'rejected' ? (
        <>
          <h2 className="content__title">
            {categoryId === 0 ? 'Все кроссовки' : `Только ${categories[categoryId]}`}
          </h2>
          <div className="content__items">{status === 'pending' ? skeletons : products}</div>
          <Pagination onSetCurrentPage={onSetCurrentPage} />
        </>
      ) : (
        <div className="content__error-info">
          <h2>Что-то пошло не так...</h2>
          <p>Произошла ошибка при загрузке товаров, попробуйте позже.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
