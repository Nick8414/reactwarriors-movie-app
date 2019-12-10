import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class GenresHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        genres: [],
        agree: true,
      };
    }

    getGenres = async () => {
      const queryStringParams = {
        language: "ru-RU",
      };

      const body = await CallApi.get("/genre/movie/list", {
        params: queryStringParams,
      });

      return body;
    };

    getGenresList = async () => {
      try {
        const response = await this.getGenres();

        const genres = response.genres;
        this.setState({
          genres,
        });
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };

    onChangeGenre = event => {
      const { with_genres, onChangeFilters } = this.props;
      const { value } = event.target;

      const updateGenres = with_genres.includes(parseInt(value))
        ? with_genres.filter(genreId => parseInt(genreId) !== parseInt(value))
        : [...with_genres, parseInt(value)];

      onChangeFilters({
        target: {
          name: "with_genres",
          value: updateGenres,
        },
      });
    };

    componentDidMount() {
      this.getGenresList();
    }

    render() {
      const { genres } = this.state;
      return (
        <Component
          genres={genres}
          onChangeGenre={this.onChangeGenre}
          {...this.props}
        />
      );
    }
  };
