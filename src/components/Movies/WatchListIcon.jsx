import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class WatchListIcon extends React.Component {
  async changeWatchListStatus(movie, watchlistStatus) {
    const {
      user,
      session_id,
      addToWatchList,
      deleteFromWatchList
    } = this.props;

    const queryStringParams = {
      session_id,
      language: "ru-RU"
    };

    try {
      const result = await CallApi.post(`/account/${user.id}/watchlist`, {
        params: queryStringParams,
        body: {
          media_type: "movie",
          media_id: movie.id,
          watchlist: watchlistStatus
        }
      });

      if (result.status_code === 1) {
        addToWatchList(movie);
      }

      if (result.status_code === 13) {
        deleteFromWatchList(movie);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { item, watchList } = this.props;
    return (
      <span>
        {watchList.find(el => el.id === item.id) ? (
          <i
            className="material-icons"
            onClick={() => this.changeWatchListStatus(item, false)}
          >
            bookmark
          </i>
        ) : (
          <i
            className="material-icons"
            onClick={() => this.changeWatchListStatus(item, true)}
          >
            bookmark_border
          </i>
        )}
      </span>
    );
  }
}

export default AppContextHOC(WatchListIcon);
