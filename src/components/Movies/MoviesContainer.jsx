import React, { Component } from "react";
import MoviesList from "./MoviesList";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MoviesContainer extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const genresParams =
      with_genres.length > 0 ? `&with_genres=${with_genres.join(",")}` : "";

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}
                  &primary_release_year=${primary_release_year}${genresParams}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.onChangePagination("total_pages", data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pagination.page !== prevProps.pagination.page) {
      console.log(this.props.pagination);
      this.getMovies(this.props.filters, this.props.pagination.page);
    }

    if (prevProps.filters !== this.props.filters) {
      this.props.onChangePagination("page", 1);
      this.getMovies(this.props.filters, 1);
    }
  }

  render() {
    const { movies } = this.state;
    return <MoviesList movies={movies} />;
  }
}
