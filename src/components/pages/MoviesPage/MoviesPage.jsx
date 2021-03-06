import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";

export const MoviesPage = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 0
      },
      showLoginForm: false
    };
  }

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePagination = (key, value) => {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        [key]: value
      }
    }));
  };

  setDefaultFilters = () => {
    this.setState({
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: ""
      },
      page: 1
    });
  };

  render() {
    const { filters, pagination } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  pagination={pagination}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                  onChangeFiltersGenre={this.onChangeFiltersGenre}
                  setDefaultFilters={this.setDefaultFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              pagination={pagination}
              onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}
