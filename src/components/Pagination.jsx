import ReactPaginate from 'react-paginate';

function Pagination({ onSetCurrentPage }) {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={3}
      onPageChange={({ selected }) => onSetCurrentPage(selected + 1)}
    />
  );
}

export default Pagination;
