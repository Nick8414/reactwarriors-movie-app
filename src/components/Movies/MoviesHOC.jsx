import React from "react";
import MoviesList from "./MoviesList";
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

      // const genresParams =
      //   with_genres.length > 0 ? `&with_genres=${with_genres.join(",")}` : "";

      // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}
      //             &primary_release_year=${primary_release_year}${genresParams}`;

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then(data => {
        console.log("data movies");
        console.log(data);
        this.props.onChangePagination("total_pages", data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
    };

    // const queryStringParams = {
    //   session_id,
    //   language: "ru-RU",
    // };

    // const favoriteMovies = await CallApi.get(
    //   `/account/${user.id}/favorite/movies`,
    //   {
    //     params: queryStringParams,
    //   }
    // );

    setFavorite(movieId) {
      const result = await CallApi.post(
        `/account/{account_id}/favorite`,
        {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        }
      );
    }

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
      return <Component movies={movies} />;
    }
  };
