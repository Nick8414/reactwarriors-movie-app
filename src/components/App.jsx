import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header/Header";
import MoviesPages from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
} from "../actions/actions";

import { API_URL, API_KEY_3, fetchApi } from "../api/api";

import CallApi from "../api/api";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { connect } from "react-redux";

export const AppContext = React.createContext();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      watchList: [],
      showLoginForm: false,
    };
  }

  getFavorites = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: queryStringParams,
    });
  };

  getWatchList = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams,
    });
  };

  // updateAuth = (user, session_id) => {
  //   this.props.store.dispatch(
  //     actionCreatorUpdateAuth({
  //       user,
  //       session_id,
  //     })
  //   );
  // };

  // updateUser = (user, session_id) => {
  //   // cookies.set("session_id", session_id, {
  //   //   path: "/",
  //   //   maxAge: 2592000,
  //   // });

  //   this.setState(
  //     {
  //       session_id,
  //       user,
  //     },
  //     async () => {
  //       const queryStringParams = {
  //         api_key: API_KEY_3,
  //         session_id: this.state.session_id,
  //         language: "ru-RU",
  //       };

  //       const favoriteMovies = await this.getFavorites(user, queryStringParams);
  //       const watchList = await this.getWatchList(user, queryStringParams);

  //       this.setFavorites(favoriteMovies.results);
  //       this.setWatchList(watchList.results);
  //     }
  //   );
  // };

  // toggleLoginForm = () => {
  //   console.log("toogle login form");
  //   this.setState((prevState) => ({
  //     showLoginForm: !prevState.showLoginForm,
  //   }));
  // };

  // onLogOut = () => {
  //   this.props.store.dispatch(actionCreatorLogOut());
  // };

  setFavorites = (favorites) => {
    this.setState({
      favorites,
    });
  };

  deleteFromFavorites = (movie) => {
    const newFavorites = this.state.favorites.filter(
      (el) => el.id !== movie.id
    );
    this.setState({
      favorites: newFavorites,
    });
  };

  addToFavorites = (movie) => {
    const newFavorites = [...this.state.favorites, movie];
    this.setState({
      favorites: newFavorites,
    });
  };

  setWatchList = (watchList) => {
    this.setState({
      watchList,
    });
  };

  deleteFromWatchList = (movie) => {
    const newWatchList = this.state.watchList.filter(
      (el) => el.id !== movie.id
    );
    this.setState({
      watchList: newWatchList,
    });
  };

  addToWatchList = (movie) => {
    const newWatchList = [...this.state.watchList, movie];
    this.setState({
      watchList: newWatchList,
    });
  };

  async componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      const user = await CallApi.get("/account", {
        params: {
          session_id,
        },
      });
      //   fetchApi(
      //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      // );
      this.props.updateAuth(user, session_id);
      // const queryStringParams = {
      //   api_key: API_KEY_3,
      //   session_id,
      //   language: "ru-RU",
      // };

      //   const favoriteMovies = await this.getFavorites(user, queryStringParams);
      //   const watchList = await this.getWatchList(user, queryStringParams);
      //   this.setFavorites(favoriteMovies.results);
      //   this.setWatchList(watchList.results);
      // }
    }
  }

  render() {
    const { favorites, watchList, showLoginForm } = this.state;
    const { user, session_id, isAuth, updateAuth, onLogOut } = this.props;
    return (
      <Router>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            favorites: favorites,
            watchList: watchList,
            showLoginForm: showLoginForm,
            updateSessionId: this.updateSessionId,

            //updateUser: this.updateUser,
            updateAuth,
            onLogOut,

            setFavorites: this.setFavorites,
            deleteFromFavorites: this.deleteFromFavorites,
            addToFavorites: this.addToFavorites,
            setWatchList: this.setWatchList,
            addToWatchList: this.addToWatchList,
            deleteFromWatchList: this.deleteFromWatchList,
            toggleLoginForm: this.toggleLoginForm,
          }}
        >
          <React.Fragment>
            <Header
              user={user}
              updateSessionId={this.updateSessionId}
              logOff={this.logOff}
            />
            {/* <Link to="/movie">go to movie</Link> */}
            <Route exact path="/" component={MoviesPages} />
            <Route path="/movie/:id" component={MoviePage} />
          </React.Fragment>
        </AppContext.Provider>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    session_id: state.session_id,
    isAuth: state.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (user, session_id) =>
      dispatch(actionCreatorUpdateAuth({ user, session_id })),
    onLogOut: () => dispatch(actionCreatorLogOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
