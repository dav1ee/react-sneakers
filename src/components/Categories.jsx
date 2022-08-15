const categories = ['Все', 'Nike', 'Adidas', 'New Balance', 'Reebok', 'Puma'];

function Categories({ categoryId, onSetCategoryId }) {
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
}

export default Categories;
