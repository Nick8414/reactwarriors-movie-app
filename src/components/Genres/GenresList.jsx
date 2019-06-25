import React from 'react';
import GenreItem from './GenreItem';
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends React.Component {
  constructor() {
    super();
    this.state = {
      genres : [],
      agree: true
    }
  }

  getGenres = async () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    const response = await fetch(link);
    const body = await response.json();
   
    if (response.status !== 200)
      throw Error(body.message);
      return body;
  }

  getGenresList = async () => {
    try {
      const response = await this.getGenres();
      const genres = response.genres.map(genre=>{
        genre.checked = false;
        return genre
      })
      this.setState({
        genres
      })
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  };

  onChangeGenre = event => {
    const { name, value, checked } = event.target;
    const {onChangeFiltersGenre} = this.props;
    const newGenres = [...this.state.genres];

    newGenres[name].checked = checked;
    onChangeFiltersGenre(parseInt(value));

    this.setState({
      genres: newGenres
    })
  }

  componentDidMount() {
    this.getGenresList()
  }

  componentDidUpdate(prevProps) {
    if (this.props.with_genres === "" &&  this.props.with_genres !== prevProps.with_genres) {
      this.getGenresList()
    }
  }

  render () {
    return (
      <React.Fragment>
        <div>Жанр:</div>
        <div className="form-check">
          {
            this.state.genres.map((genre, idx) => {
              return (
                <GenreItem 
                  genre={genre}
                  onChangeGenre={this.onChangeGenre}
                  index={idx}
                />
              )
            })
          }
        </div>
      </React.Fragment>   
    )
  }
}