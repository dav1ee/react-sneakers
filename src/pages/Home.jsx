import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setSort, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);

  const products = items.map((obj) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onSetCategoryId = (id) => dispatch(setCategoryId(id));
  const onSetSort = (obj) => dispatch(setSort(obj));
  const onSetCurrentPage = (page) => dispatch(setCurrentPage(page));

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `modelName=${searchValue}` : '';
    const category = categoryId > 0 ? categoryId : '';
    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'asc' : 'desc';

    axios
      .get(
        `https://62f25d0e18493ca21f32200f.mockapi.io/items?page=${currentPage}&limit=8&${search}&category=${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then(({ data }) => setItems(data))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
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
