import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({ onChangePages }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePages(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
