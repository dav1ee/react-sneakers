import { FC } from 'react';
import { useDispatch } from 'react-redux';

import {
  addProduct,
  removeProduct,
  minusProduct,
  CartProductType,
} from '../redux/slices/cartSlice';
import { getFormattedPrice } from '../utils/getFormattedPrice';

type CartItemProps = {
  id: string;
  modelName: string;
  imageUrl: string;
  price: number;
  size: number;
  count: number;
};

const CartItem: FC<CartItemProps> = ({ id, modelName, imageUrl, price, size, count }) => {
  const dispatch = useDispatch();

  const onPlusProduct = () => dispatch(addProduct({ id, size } as CartProductType));
  const onRemoveProduct = () => dispatch(removeProduct({ id, size }));
  const onMinusProduct = () => dispatch(minusProduct({ id, size }));

  const formattedPrice = getFormattedPrice(price * count);

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="product-block__image" src={imageUrl} alt="Product" />
      </div>
      <div className="cart__item-info">
        <h3>{modelName}</h3>
        <p>{size} EU</p>
      </div>
      <div className="cart__item-count">
        <div
          className={`button button--outline button--circle cart__item-count-minus ${
            count < 2 ? 'button--disabled' : ''
          }`}
          onClick={onMinusProduct}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#303030"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#303030"></path>
          </svg>
        </div>
        <b>{count}</b>
        <div
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onPlusProduct}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#303030"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#303030"></path>
          </svg>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{formattedPrice} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle" onClick={onRemoveProduct}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#303030"></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#303030"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
