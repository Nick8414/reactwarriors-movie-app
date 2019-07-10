import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const genresParams = with_genres.length>0 ? `&with_genres=${with_genres.join(',')}`:'';
    
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}
                  &primary_release_year=${primary_release_year}${genresParams}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangeTotalPage(data.total_pages);
        this.setState({
          movies: data.results
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
      this.getMovies(nextProps.filters)
    }
  }

  componentDidMount() {
    // const sort_by = this.props.filters.sort_by
    this.getMovies(this.props.filters)
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
    //   this.props.onChangePage(1);
    //   this.getMovies(this.props.filters, 1);
    // }

    

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }

    if (prevProps.filters !== this.props.filters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    // if (this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {
    //   this.getMovies(this.props.filters, this.props.page);
    // }

    // if (this.props.filters.with_genres !== prevProps.filters.with_genres) {
    //   this.getMovies(this.props.filters, this.props.page);
    //}
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
