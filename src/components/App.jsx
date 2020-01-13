import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
import CallApi from "../api/api";

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
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 0
      },
      showLoginForm: false
    };
  }

  getFavorites = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: queryStringParams
    });
  };

  getWatchList = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams
    });
  };

  // updateSessionId = session_id => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 2592000
  //   });
  //   this.setState({
  //     session_id
  //   });
  // };

  updateUser = (user, session_id) => {
    console.log("update user");
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });

    this.setState(
      {
        session_id,
        user
      },
      async () => {
        const queryStringParams = {
          api_key: API_KEY_3,
          session_id: this.state.session_id,
          language: "ru-RU"
        };

        const favoriteMovies = await this.getFavorites(user, queryStringParams);
        const watchList = await this.getWatchList(user, queryStringParams);
        console.log("watchList");
        console.log(watchList);

        this.setFavorites(favoriteMovies.results);
        this.setWatchList(watchList.results);
      }
    );
  };

  toggleLoginForm = () => {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm
    }));
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorites: [],
      watchList: []
    });
  };

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePagination = (key, value) => {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        [key]: value
      }
    }));
  };

  setDefaultFilters = () => {
    this.setState({
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: ""
      },
      page: 1
    });
  };

  setFavorites = favorites => {
    this.setState({
      favorites
    });
  };

  deleteFromFavorites = movie => {
    const newFavorites = this.state.favorites.filter(el => el.id !== movie.id);
    this.setState({
      favorites: newFavorites
    });
  };

  addToFavorites = movie => {
    const newFavorites = [...this.state.favorites, movie];
    this.setState({
      favorites: newFavorites
    });
  };

  setWatchList = watchList => {
    this.setState({
      watchList
    });
  };

  deleteFromWatchList = movie => {
    const newWatchList = this.state.watchList.filter(el => el.id !== movie.id);
    this.setState({
      watchList: newWatchList
    });
  };

  addToWatchList = movie => {
    const newWatchList = [...this.state.watchList, movie];
    this.setState({
      watchList: newWatchList
    });
  };

  async componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      );
      //this.updateSessionId(session_id);
      this.updateUser(user, session_id);
      const queryStringParams = {
        api_key: API_KEY_3,
        session_id,
        language: "ru-RU"
      };

      const favoriteMovies = await this.getFavorites(user, queryStringParams);
      const watchList = await this.getWatchList(user, queryStringParams);
      this.setFavorites(favoriteMovies.results);
      this.setWatchList(watchList.results);
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
      showLoginForm
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          favorites: favorites,
          watchList: watchList,
          showLoginForm: showLoginForm,
          updateSessionId: this.updateSessionId,
          updateUser: this.updateUser,
          onLogOut: this.onLogOut,
          setFavorites: this.setFavorites,
          deleteFromFavorites: this.deleteFromFavorites,
          addToFavorites: this.addToFavorites,
          setWatchList: this.setWatchList,
          addToWatchList: this.addToWatchList,
          deleteFromWatchList: this.deleteFromWatchList,
          toggleLoginForm: this.toggleLoginForm
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
