import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: []
      },
      page: 1,
      total_pages: 0
    };
  }

  onChangeFilters = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    }
    this.setState({
      filters: newFilters
    })
  }

  onChangePage = (page) => {
    this.setState({
      page
    });
  };

  onChangeTotalPage = (total_pages) => {
    this.setState({
      total_pages
    });
  };

  setDefaultFilters = () => {
    console.log(`Set Default Filters`)
    this.setState({
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: ""
      },
      page: 1
    })
  }

  render() {
    const {filters, page, total_pages} = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters} 
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  onChangeFiltersGenre={this.onChangeFiltersGenre}
                  setDefaultFilters={this.setDefaultFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList 
              filters={filters} 
              page={page} 
              onChangePage={this.onChangePage}
              onChangeTotalPage={this.onChangeTotalPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
