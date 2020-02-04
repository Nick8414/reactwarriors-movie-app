import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: [],
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
      };

      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(",");
      }

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then(data => {
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
        this.getMovies(this.props.filters, this.props.pagination.page);
      }

      if (prevProps.filters !== this.props.filters) {
        this.props.onChangePagination("page", 1);
        this.getMovies(this.props.filters, 1);
      }
    }

    render() {
      const { movies } = this.state;
      return <Component {...this.props} movies={movies} />;
    }
  };
