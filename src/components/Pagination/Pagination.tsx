import _ from 'lodash';
import { FC } from 'react';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onChange,
}) => {
  const maxButtons: number = 5;
  const pageNumbers: number[] = [];
  const centerPage: number = Math.floor(maxButtons / 2);
  let startPage: number = Math.max(currentPage - centerPage, 1);
  let endPage: number = Math.min(startPage + maxButtons - 1, pageCount);
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  const handlePrevClick = () => {
    onChange(currentPage - 1);
  };
  const handleNextClick = () => {
    onChange(currentPage + 1);
  };
  return (
    <ul className="pagination">
      <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
        <button className="page-link" onClick={handlePrevClick}>
          Previous
        </button>
      </li>
      {startPage > 1 && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}
      {_.map(pageNumbers,(number) => (
        <li
          key={number}
          className={`page-item${number === currentPage ? ' active' : ''}`}
        >
          <button className="page-link" onClick={() => onChange(number)}>
            {number}
          </button>
        </li>
      ))}
      {endPage < pageCount && (
        <li className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )}
      <li className={`page-item${currentPage === pageCount ? ' disabled' : ''}`}>
        <button className="page-link" onClick={handleNextClick}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;