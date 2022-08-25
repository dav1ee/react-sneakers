import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct, cartProductsByIdSelector } from '../../redux/slices/cartSlice';
import { getFormattedPrice } from '../../utils/getFormattedPrice';

function ProductBlock({ id, brandName, modelName, imageUrl, price, sizes }) {
  const dispatch = useDispatch();
  const cartProduct = useSelector(cartProductsByIdSelector(id));

  const [selectedSize, setSelectedSize] = useState(null);

  const formattedPrice = getFormattedPrice(price);
  const countAdded = cartProduct.length
    ? cartProduct.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0)
    : 0;

  const onAddProduct = () => {
    const product = {
      id,
      modelName,
      imageUrl,
      price,
      size: sizes[selectedSize],
    };

    dispatch(addProduct(product));
  };

  return (
    <div className="product-block-wrapper">
      <div className="product-block">
        <img className="product-block__image" src={imageUrl} alt="Product" />
        <h4 className="product-block__title">{modelName}</h4>
        <p className="product-block__subtitle">{brandName}</p>
        <div className="product-block__selector">
          <ul>
            {sizes &&
              sizes.map((size, index) => (
                <li
                  key={index}
                  className={selectedSize === index ? 'active' : ''}
                  onClick={() => setSelectedSize(index)}>
                  {size} EU
                </li>
              ))}
          </ul>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">{formattedPrice} ₽</div>
          <button
            className={`button button--outline button--add ${
              selectedSize === null ? 'button--disabled' : ''
            }`}
            onClick={onAddProduct}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countAdded > 0 && selectedSize !== null && <i>{countAdded}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductBlock;
