import React from "react";
import CallApi, { API_KEY_3, fetchApi } from "../../api/api";

export default class MovieItem extends React.Component {
  async changeFavoriteStatus(movieId, favoriteStatus) {
    const {
      user,
      session_id,
      deleteFromFavorites,
      addToFavorites,
    } = this.props;
    console.log(this.props);
    const queryStringParams = {
      api_key: API_KEY_3,
      session_id,
      language: "ru-RU",
    };

    try {
      const result = await CallApi.post(`/account/${user.id}/favorite`, {
        params: queryStringParams,
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite: favoriteStatus,
        },
      });
      console.log(result);

      if (result.status_code === 1) {
        addToFavorites(movieId);
      }

      if (result.status_code === 13) {
        deleteFromFavorites(movieId);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async changeWatchListStatus(movieId, watchlistStatus) {
    const { user, session_id } = this.props;
    console.log(this.props);
    const queryStringParams = {
      api_key: API_KEY_3,
      session_id,
      language: "ru-RU",
    };

    const result = await CallApi.post(`/account/${user.id}/favorite`, {
      params: queryStringParams,
      body: {
        media_type: "movie",
        media_id: movieId,
        watchlist: watchlistStatus,
      },
    });

    console.log(result);
  }
  render() {
    const { item, favorites } = this.props;

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">
            {item.title} {item.id}
          </h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>

          {favorites.includes(item.id) ? (
            <i
              className="material-icons"
              onClick={() => this.changeFavoriteStatus(item.id, false)}
            >
              star
            </i>
          ) : (
            <i
              className="material-icons"
              onClick={() => this.changeFavoriteStatus(item.id, true)}
            >
              star_border
            </i>
          )}

          {/* <i className="material-icons">bookmark</i> */}
          <i
            className="material-icons"
            onClick={() => this.changeWatchListStatus(item.id, true)}
          >
            bookmark_border
          </i>
        </div>
      </div>
    );
  }
}
