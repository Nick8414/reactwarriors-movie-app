import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './Header/Header'
import MoviesPages from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'

import { API_URL, API_KEY_3, fetchApi } from '../api/api'
import Cookies from 'universal-cookie'
import CallApi from '../api/api'

const cookies = new Cookies()

export const AppContext = React.createContext()

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      user: null,
      favorites: [],
      watchList: [],
      session_id: null,
      showLoginForm: false
    }
  }

  getFavorites = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: queryStringParams
    })
  }

  getWatchList = (user, queryStringParams) => {
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: queryStringParams
    })
  }

  updateUser = (user, session_id) => {
    console.log('update user')
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000
    })

    this.setState(
      {
        session_id,
        user
      },
      async () => {
        const queryStringParams = {
          api_key: API_KEY_3,
          session_id: this.state.session_id,
          language: 'ru-RU'
        }

        const favoriteMovies = await this.getFavorites(user, queryStringParams)
        const watchList = await this.getWatchList(user, queryStringParams)

        this.setFavorites(favoriteMovies.results)
        this.setWatchList(watchList.results)
      }
    )
  }

  toggleLoginForm = () => {
    console.log('toogle login form')
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm
    }))
  }

  onLogOut = () => {
    cookies.remove('session_id')
    this.setState({
      session_id: null,
      user: null,
      favorites: [],
      watchList: []
    })
  }

  setFavorites = favorites => {
    this.setState({
      favorites
    })
  }

  deleteFromFavorites = movie => {
    const newFavorites = this.state.favorites.filter(el => el.id !== movie.id)
    this.setState({
      favorites: newFavorites
    })
  }

  addToFavorites = movie => {
    const newFavorites = [...this.state.favorites, movie]
    this.setState({
      favorites: newFavorites
    })
  }

  setWatchList = watchList => {
    this.setState({
      watchList
    })
  }

  deleteFromWatchList = movie => {
    const newWatchList = this.state.watchList.filter(el => el.id !== movie.id)
    this.setState({
      watchList: newWatchList
    })
  }

  addToWatchList = movie => {
    const newWatchList = [...this.state.watchList, movie]
    this.setState({
      watchList: newWatchList
    })
  }

  async componentDidMount () {
    const session_id = cookies.get('session_id')

    if (session_id) {
      const user = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      )
      //this.updateSessionId(session_id);
      this.updateUser(user, session_id)
      const queryStringParams = {
        api_key: API_KEY_3,
        session_id,
        language: 'ru-RU'
      }

      const favoriteMovies = await this.getFavorites(user, queryStringParams)
      const watchList = await this.getWatchList(user, queryStringParams)
      this.setFavorites(favoriteMovies.results)
      this.setWatchList(watchList.results)
    }
  }

  render () {
    const { user, session_id, favorites, watchList, showLoginForm } = this.state
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
        <Router>
          <React.Fragment>
            <Header
              user={user}
              updateSessionId={this.updateSessionId}
              logOff={this.logOff}
            />
            {/* <Link to="/movie">go to movie</Link> */}
            <Route exact path='/' component={MoviesPages} />
            <Route path='/movie/:id' component={MoviePage} />
          </React.Fragment>
        </Router>
      </AppContext.Provider>
    )
  }
}
