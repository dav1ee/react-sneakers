import { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import SizeSelector from '../components/SizeSelector';

import { addProduct } from '../redux/slices/cart/slice';
import { getFormattedPrice } from '../utils/getFormattedPrice';

import { CartProductType } from '../redux/slices/cart/types';

const ProductDetails: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState<{
    id: string;
    brandName: string;
    modelName: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    manufacturer: string;
    material: string;
  }>();
  const [formattedPrice, setFormattedPrice] = useState<string>();
  const [selectedSize, setSelectedSize] = useState(0);

  const { id } = useParams();

  const onSetSelectedSize = (size: number) => setSelectedSize(size);
  const onAddProduct = (obj: CartProductType) => dispatch(addProduct(obj));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://62f25d0e18493ca21f32200f.mockapi.io/items/${id}`);
        setProduct(data);
        setFormattedPrice(getFormattedPrice(data.price));
      } catch (err) {
        let message = 'Some error';
        if (err instanceof Error) message = err.message;
        alert(`Произошла ошибка: ${message}`);
        navigate('/');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="product-details__wrapper">
        <div className="product-details"></div>
      </div>
    );
  }

  return (
    <div className="product-details__wrapper">
      <div className="product-details">
        <img className="product-details__image" src={product.imageUrl} alt="Product" />
        <div className="product-details__sidebar">
          <div className="product-details__title">{product.modelName}</div>
          <div className="product-details__subtitle">{product.brandName}</div>
          <div className="product-details__info">
            <p>
              <b>Производитель</b> - {product.manufacturer}
            </p>
            <p>
              <b>Материалы</b> - {product.material}
            </p>
          </div>
          <div className="product-details__sizes">
            <h4>Доступные размеры</h4>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              setSelectedSize={onSetSelectedSize}
            />
          </div>
          <div className="product-details__price">{formattedPrice} ₽</div>
          <button
            className="button button--black"
            onClick={() =>
              onAddProduct({
                id: product.id,
                modelName: product.modelName,
                imageUrl: product.imageUrl,
                price: product.price,
                size: product.sizes[selectedSize],
                count: 0,
              })
            }>
            <span>Добавить ({product.sizes[selectedSize]} EU)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
