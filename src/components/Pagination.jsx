import ReactPaginate from 'react-paginate';

function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={3}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
    />
  );
}

export default Pagination;
