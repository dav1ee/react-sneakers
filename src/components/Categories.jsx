const categories = ['Все', 'Nike', 'Adidas', 'New Balance', 'Reebok', 'Puma'];

function Categories({ categoryId, setCategoryId }) {
  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => setCategoryId(index)}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
