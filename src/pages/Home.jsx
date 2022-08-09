import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Pagination from '../components/Pagination';

function Home() {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все кроссовки</h2>
      <div className="content__items">
        <ProductBlock />
        <ProductBlock />
        <ProductBlock />
        <ProductBlock />
        <ProductBlock />
        <ProductBlock />
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
