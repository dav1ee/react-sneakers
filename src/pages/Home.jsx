import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories, { categories } from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setSort, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchProducts } from '../redux/slices/productsSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.products);

  const products = items.map((obj) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onSetCategoryId = (id) => dispatch(setCategoryId(id));
  const onSetSort = (obj) => dispatch(setSort(obj));
  const onSetCurrentPage = (page) => dispatch(setCurrentPage(page));

  const getProducts = async () => {
    const search = searchValue ? `modelName=${searchValue}` : '';
    const category = categoryId > 0 ? categoryId : '';
    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'asc' : 'desc';

    dispatch(
      fetchProducts({
        currentPage,
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
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.type === params.sortBy);

      dispatch(
        setFilters({
          ...params,
          sort,
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
}

export default Home;
