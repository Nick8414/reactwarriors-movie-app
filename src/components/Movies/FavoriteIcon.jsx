import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class FavoriteIcon extends React.Component {
  async changeFavoriteStatus(movie, favoriteStatus) {
    const {
      user,
      session_id,
      deleteFromFavorites,
      addToFavorites
    } = this.props;

    const queryStringParams = {
      session_id,
      language: "ru-RU"
    };

    try {
      const result = await CallApi.post(`/account/${user.id}/favorite`, {
        params: queryStringParams,
        body: {
          media_type: "movie",
          media_id: movie.id,
          favorite: favoriteStatus
        }
      });

      if (result.status_code === 1) {
        addToFavorites(movie);
      }

      if (result.status_code === 13) {
        deleteFromFavorites(movie);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { item, favorites } = this.props;
    console.log(this.props);
    return (
      <span>
        {favorites.find(el => el.id === item.id) ? (
          <i
            className="material-icons"
            onClick={() => this.changeFavoriteStatus(item, false)}
          >
            star
          </i>
        ) : (
          <i
            className="material-icons"
            onClick={() => this.changeFavoriteStatus(item, true)}
          >
            star_border
          </i>
        )}
      </span>
    );
  }
}

export default AppContextHOC(FavoriteIcon);
