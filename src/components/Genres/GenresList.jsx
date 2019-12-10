import React from "react";
import GenreItem from "./GenreItem";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const GenresList = ({ genres, onChangeGenre, with_genres }) => {
  return (
    <React.Fragment>
      <div>Жанр:</div>
      <div className="form-check">
        {genres.map((genre, idx) => {
          return (
            <GenreItem
              key={genre.id}
              genre={genre}
              onChangeGenre={onChangeGenre}
              index={idx}
              checked={with_genres.includes(genre.id)}
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

export default GenresHOC(GenresList);
