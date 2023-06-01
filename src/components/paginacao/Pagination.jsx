// Pagination.js

import React from "react";
import './padinacao.css'

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button className="page-button" onClick={onPrevPage}>
          Anterior
        </button>
      )}
      <span className="page-number">Página {currentPage}</span>
      {currentPage < totalPages && (
        <button className="page-button" onClick={onNextPage}>
          Próxima
        </button>
      )}
    </div>
  );
};

export default Pagination;
