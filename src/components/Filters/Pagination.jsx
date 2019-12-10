import React from 'react';

const Pagination = (props) => {
  const {pagination:{page, total_pages}, onPreviousPage, onNextPage, setDefaultFilters} = props;
  return (
    <React.Fragment>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn btn-light" 
          disabled={page===1}  
          onClick={onPreviousPage}
        >
           Назад
        </button>
        <button type="button" className="btn btn-light" onClick={onNextPage} >Вперед</button>
        <button type="button" className="btn btn-light" onClick={setDefaultFilters} >Сбросить фильтры</button>
      </div>
      <div>Текущая страница: {page} из {total_pages}</div>
    </React.Fragment>    
  )
}

export default Pagination;