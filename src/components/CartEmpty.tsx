import { FC } from 'react';
import { Link } from 'react-router-dom';

export const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая</h2>
      <p>
        Вы не добавили товар в корзину.
        <br />
        Перейдите на главную страницу, чтобы добавить.
      </p>
      <Link to="/" className="button button--black">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
        <span>На главную</span>
      </Link>
    </div>
  );
};
