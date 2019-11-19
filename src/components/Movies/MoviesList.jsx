import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";
import { AppContext } from "../App";

const MoviesList = ({ movies, user, session_id }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie} user={user} session_id={session_id} />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const MoviesListContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return <MoviesList {...context} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

export default MoviesHOC(MoviesListContainer);
