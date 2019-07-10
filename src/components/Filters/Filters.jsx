import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";
import Genres from "../Genres/GenresList";

export default class Filters extends React.Component {
  render() {
    const { filters:{sort_by, primary_release_year, with_genres}, onChangeFilters, setDefaultFilters, 
                      onChangePage, total_pages, page } = this.props;
    return (
      <form className="mb-3">
        <SortBy 
          sort_by={sort_by} 
          onChangeFilters={onChangeFilters}
        />
        <ReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres 
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
        />
        <div className="btn-group">
          <button 
            type="button" 
            className="btn btn-light" 
            disabled={page===1}  
            onClick={()=>{onChangePage(page - 1)}}
          >
            Назад
          </button>
          {/* onClick={onChangePage.bind(null, page - 1)} */}
          <button type="button" className="btn btn-light" onClick={()=>{onChangePage(page + 1)}} >Вперед</button>
          <button type="button" className="btn btn-light" onClick={setDefaultFilters} >Сбросить фильтры</button>
        </div>
        <div>Текущая страница: {page} из {total_pages}</div>
      </form>
    );
  }
}
