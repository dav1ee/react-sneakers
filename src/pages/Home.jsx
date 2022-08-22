import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setSort, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

import { sortList } from '../components/Sort';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);

  const products = items.map((obj) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onSetCategoryId = (id) => dispatch(setCategoryId(id));
  const onSetSort = (obj) => dispatch(setSort(obj));
  const onSetCurrentPage = (page) => dispatch(setCurrentPage(page));

  const fetchProducts = () => {
    setIsLoading(true);

    const search = searchValue ? `modelName=${searchValue}` : '';
    const category = categoryId > 0 ? categoryId : '';
    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'asc' : 'desc';

    axios
      .get(
        `https://62f25d0e18493ca21f32200f.mockapi.io/items?page=${currentPage}&limit=8&${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
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
      fetchProducts();
    }

    isSearch.current = false;
  }, [currentPage, searchValue, categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onSetCategoryId={onSetCategoryId} />
        <Sort sort={sort} onSetSort={onSetSort} />
      </div>
      <h2 className="content__title">Все кроссовки</h2>
      <div className="content__items">{isLoading ? skeletons : products}</div>
      <Pagination onSetCurrentPage={onSetCurrentPage} />
    </div>
  );
}

export default Home;
