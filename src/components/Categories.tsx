import { FC, memo } from 'react';

export const categories: string[] = ['Все', 'Nike', 'Adidas', 'New Balance', 'Reebok', 'Puma'];

type CategoriesProps = {
  categoryId: number;
  onSetCategoryId: (cat: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ categoryId, onSetCategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => onSetCategoryId(index)}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
