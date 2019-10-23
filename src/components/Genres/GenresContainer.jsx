import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import GenresList from "./GenresList";

export default class Genres extends React.Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      agree: true,
    };
  }

  getGenres = async () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    const response = await fetch(link);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
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
    const { genres } = this.state.genres;
    <GenresList genres={genres} />;
  }
}
