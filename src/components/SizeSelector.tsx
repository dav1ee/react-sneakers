import { FC } from 'react';

type SizeSelectorProps = {
  sizes: number[];
  selectedSize: number;
  setSelectedSize: (size: number) => void;
};

const SizeSelector: FC<SizeSelectorProps> = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <div className="size-selector">
      <ul>
        {sizes.map((size, index) => (
          <li
            key={index}
            className={selectedSize === index ? 'active' : ''}
            onClick={() => setSelectedSize(index)}>
            {size} EU
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeSelector;
