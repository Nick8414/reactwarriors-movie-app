import React from "react";
import GenreItem from "./GenreItem";
import PropTypes from "prop-types";

const GenresList = ({ genres }) => {
  return (
    <React.Fragment>
      <div>Жанр:</div>
      <div className="form-check">
        {genres.map((genre, idx) => {
          return (
            <GenreItem
              key={genre.id}
              genre={genre}
              onChangeGenre={this.onChangeGenre}
              index={idx}
              checked={this.props.with_genres.includes(genre.id)}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

GenresList.defaultProps = {
  genres: [],
};

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default GenresList;
