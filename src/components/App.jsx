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
        with_genres: ""
      },
      page: 1
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

  onChangeFiltersGenre = (genreId) => {
    console.log(`genreId`, genreId)
    let newWithGenres = this.state.filters.with_genres;
    let arrayOfString = newWithGenres.split(',');
    console.log(arrayOfString);
    let idx = arrayOfString.findIndex(el=>parseInt(genreId)===parseInt(el));

    console.log(idx);
    if (idx > -1) {
      arrayOfString.splice(idx,1);
      newWithGenres = arrayOfString.join(',')
    } else {
      newWithGenres = newWithGenres + genreId + ',';
    }
     
    
    
    const newFilters = {
      ...this.state.filters,
      with_genres: newWithGenres
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
    const {filters, page} = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
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
            />
          </div>
        </div>
      </div>
    );
  }
}
