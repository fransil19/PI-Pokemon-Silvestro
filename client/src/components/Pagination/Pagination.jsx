import React from "react";

const Pagination = ({ currentPage, onChangePage, totalPages }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const onClickButton = (num) => {
    onChangePage(num);
  };

  return (
    <div>
      {pageNumbers ? pageNumbers.map((pageNum) => {
        return <button key={pageNum} onClick={() => onClickButton(pageNum)}>{pageNum}</button>
      }) : null}
    </div>
  );
};

export default Pagination;
