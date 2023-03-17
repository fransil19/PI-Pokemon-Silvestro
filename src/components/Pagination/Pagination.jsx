import './Pagination.css'
import React from "react";

const Pagination = ({ currentPage, onChangePage, totalPages }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const onClickButton = (num) => {
    onChangePage(num);
  };

  const onClickPrevious = () => {
    
    if(currentPage !== 1) {
      onChangePage(currentPage-1)
    }
  }

  const onClickNext = () => {
    if(currentPage !== totalPages) {
      onChangePage(currentPage+1)
    }
  }

  return (
    <div>
      <button onClick={onClickPrevious} className="button-pag">&laquo;</button>
      {pageNumbers ? pageNumbers.map((pageNum) => {
        return <button key={pageNum} onClick={() => onClickButton(pageNum)} className="button-pag">{pageNum}</button>
      }) : null}
      <button onClick={onClickNext} className="button-pag">&raquo;</button>
    </div>
  );
};

export default Pagination;
