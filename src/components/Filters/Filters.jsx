import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";
import Genres from "../Genres/GenresList";
import Pagination from "./Pagination";

export default class Filters extends React.Component {
  onNextPage = () => {
    this.props.onChangePagination("page", this.props.pagination.page + 1);
  };
  onPreviousPage = () => {
    this.props.onChangePagination("page", this.props.pagination.page - 1);
  };

  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      setDefaultFilters,
      pagination,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <ReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
        <Pagination
          pagination={pagination}
          onPreviousPage={this.onPreviousPage}
          onNextPage={this.onNextPage}
          setDefaultFilters={setDefaultFilters}
        />
      </form>
    );
  }
}
