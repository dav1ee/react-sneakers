function Pagination() {
  return (
    <ul className="pagination">
      <li className="previous">
        <a href="/">{'<'}</a>
      </li>
      <li className="selected">
        <a href="/">1</a>
      </li>
      <li>
        <a href="/">2</a>
      </li>
      <li>
        <a href="/">3</a>
      </li>
      <li className="next">
        <a href="/">{'>'}</a>
      </li>
    </ul>
  );
}

export default Pagination;
