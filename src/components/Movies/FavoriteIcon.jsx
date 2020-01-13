import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class FavoriteIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      status: false
    };
  }

  async changeFavoriteStatus(movie, favoriteStatus) {
    const {
      user,
      session_id,
      deleteFromFavorites,
      addToFavorites,
      toggleLoginForm
    } = this.props;

    if (user) {
      const queryStringParams = {
        session_id,
        language: "ru-RU"
      };

      try {
        this.setState({ status: true });
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

        this.setState({ status: false });
      } catch (err) {
        console.log(err);
      }
    } else {
      // toggleLoginForm();
    }
  }

  render() {
    const { item, favorites } = this.props;
    const { status } = this.state;

    return (
      <span>
        {favorites.find(el => el.id === item.id) ? (
          <button
            onClick={() => this.changeFavoriteStatus(item, false)}
            className="mdc-icon-button material-icons"
            disabled={status}
          >
            star
          </button>
        ) : (
          <button
            onClick={() => this.changeFavoriteStatus(item, true)}
            className="mdc-icon-button material-icons"
            disabled={status}
          >
            star_border
          </button>
        )}
      </span>
    );
  }
}

export default AppContextHOC(FavoriteIcon);
