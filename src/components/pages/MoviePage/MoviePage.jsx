import React from 'react'
import CallApi from '../../../api/api'
import WatchListIcon from '../../Movies/WatchListIcon'
import FavoriteIcon from '../../Movies/FavoriteIcon'
import { Route, NavLink, Switch } from 'react-router-dom'
import MovieDetail from './MovieDetail'
import MovieVideos from './MovieVideos'
import MovieCredits from './MovieCredits'

export default class MoviePage extends React.Component {
  constructor () {
    super()
    this.state = {
      movie: null,
      activeTab: '1'
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getMovie(this.props.match.params.id)
    }
  }

  getMovie (movie_id) {
    CallApi.get(`/movie/${movie_id}`).then(data => {
      this.setState({
        movie: data
      })
    })
  }

  componentDidMount () {
    this.getMovie(this.props.match.params.id)
  }

  render () {
    const { movie } = this.state
    return (
      movie && (
        <div className='container'>
          <div className='row mt-4'>
            <div className='col-4'>
              <img
                className='card-img-top card-img--height'
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
                  movie.poster_path}`}
                alt=''
              />
            </div>
            <div className='col-8'>
              <h2 className='title mb-4'>{movie && movie.title}</h2>
              <p className='mb-4'>{movie && movie.overview}</p>
              <span>Рейтинг Пользователей: {movie.vote_average}</span>
              <div>
                <FavoriteIcon item={movie} />
                <WatchListIcon item={movie} />
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-12'>
              <div>
                <ul className='nav nav-tabs'>
                  <li className='nav-item'>
                    <NavLink
                      to={`/movie/${movie.id}/details`}
                      className='nav-link'
                      activeClassName='active'
                    >
                      Детали
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to={`/movie/${movie.id}/videos`}
                      className='nav-link'
                    >
                      Видео
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink
                      to={`/movie/${movie.id}/credits`}
                      className='nav-link'
                    >
                      Актеры
                    </NavLink>
                  </li>
                </ul>
                <div className='tab-content'>
                  <Switch>
                    <Route
                      path={`/movie/:id/details`}
                      component={() => <MovieDetail movie={movie} />}
                    />
                    <Route path={`/movie/:id/videos`} component={MovieVideos} />
                    <Route
                      path={`/movie/:id/credits`}
                      component={MovieCredits}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}
