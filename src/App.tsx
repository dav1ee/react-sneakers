import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const ProductDetails = React.lazy(
  () => import(/* webpackChunkName: "ProductDetails" */ './pages/ProductDetails'),
);
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<h3>Загрузка...</h3>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<h3>Загрузка...</h3>}>
                <ProductDetails />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<h3>Загрузка...</h3>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
