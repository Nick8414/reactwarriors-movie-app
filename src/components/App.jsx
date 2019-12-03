import React from "react";
import Filters from "./Filters/Filters";
import MoviesContainer from "./Movies/MoviesContainer";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi, { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      favorites: [],
      watchList: [],
      session_id: null,
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: [],
      },
      pagination: {
        page: 1,
        total_pages: 0,
      },
    };
  }

  updateUser = user => {
    this.setState({
      user,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };
    this.setState({
      filters: newFilters,
    });
  };

  onChangePagination = (key, value) => {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        [key]: value,
      },
    }));
  };

  setDefaultFilters = () => {
    this.setState({
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: "",
      },
      page: 1,
    });
  };

  setFavorites = favorites => {
    this.setState({
      favorites,
    });
  };

  deleteFromFavorites = movieId => {
    const newFavorites = this.state.favorites.filter(el => el !== movieId);
    this.setState({
      favorites: newFavorites,
    });
  };

  addToFavorites = movieId => {
    const newFavorites = [...this.state.favorites, movieId];
    this.setState({
      favorites: newFavorites,
    });
  };

  setWatchList = watchList => {
    this.setState({
      watchList,
    });
  };

  deleteFromWatchList = movieId => {
    const newWatchList = this.state.watchList.filter(el => el !== movieId);
    this.setState({
      watchList: newWatchList,
    });
  };

  addToWatchList = movieId => {
    const newWatchList = [...this.state.watchList, movieId];
    this.setState({
      watchList: newWatchList,
    });
  };

  async componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      );
      this.updateUser(user);
      const queryStringParams = {
        api_key: API_KEY_3,
        session_id,
        language: "ru-RU",
      };

      const favoriteMovies = await CallApi.get(
        `/account/${user.id}/favorite/movies`,
        {
          params: queryStringParams,
        }
      );

      const favoriteMoviesIds = favoriteMovies.results.map(el => el.id);
      this.setFavorites(favoriteMoviesIds);

      const watchList = await CallApi.get(
        `/account/${user.id}/watchlist/movies`,
        {
          params: queryStringParams,
        }
      );

      const watchListsIds = watchList.results.map(el => el.id);
      this.setWatchList(watchListsIds);

      this.updateSessionId(session_id);
    }
  }

  render() {
    const {
      filters,
      pagination,
      user,
      session_id,
      favorites,
      watchList,
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          favorites: favorites,
          watchList: watchList,
          updateSessionId: this.updateSessionId,
          updateUser: this.updateUser,
          onLogOut: this.onLogOut,
          setFavorites: this.setFavorites,
          deleteFromFavorites: this.deleteFromFavorites,
          addToFavorites: this.addToFavorites,
          setWatchList: this.setWatchList,
          addToWatchList: this.addToWatchList,
          deleteFromWatchList: this.deleteFromWatchList,
        }}
      >
        <React.Fragment>
          <Header
            user={user}
            updateSessionId={this.updateSessionId}
            logOff={this.logOff}
          />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      pagination={pagination}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePagination={this.onChangePagination}
                      onChangeFiltersGenre={this.onChangeFiltersGenre}
                      setDefaultFilters={this.setDefaultFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  pagination={pagination}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}
