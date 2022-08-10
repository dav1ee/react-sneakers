import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState({ name: 'популярности', type: 'rating' });

  const products = items.map((obj) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? categoryId : '';
    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'asc' : 'desc';

    axios
      .get(
        `https://62f25d0e18493ca21f32200f.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then(({ data }) => setItems(data))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <h2 className="content__title">Все кроссовки</h2>
      <div className="content__items">{isLoading ? skeletons : products}</div>
      <Pagination />
    </div>
  );
}

export default Home;
