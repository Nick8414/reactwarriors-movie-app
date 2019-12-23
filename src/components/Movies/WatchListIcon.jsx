import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class WatchListIcon extends React.Component {
  constructor() {
    super();
    this.state = {
      status: false
    };
  }
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
      this.setState({ status: true });
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

      this.setState({ status: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { item, watchList } = this.props;
    const { status } = this.state;
    return (
      <span>
        {watchList.find(el => el.id === item.id) ? (
          <button
            onClick={() => this.changeWatchListStatus(item, false)}
            className="mdc-icon-button material-icons"
            disabled={status}
          >
            bookmark
          </button>
        ) : (
          <button
            onClick={() => this.changeWatchListStatus(item, true)}
            className="mdc-icon-button material-icons"
            disabled={status}
          >
            bookmark_border
          </button>
        )}
      </span>
    );
  }
}

export default AppContextHOC(WatchListIcon);
