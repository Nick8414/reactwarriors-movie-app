import React from 'react'
import CallApi from '../../../api/api'
import WatchListIcon from '../../Movies/WatchListIcon'
import FavoriteIcon from '../../Movies/FavoriteIcon'
import { Route, NavLink, Switch } from 'react-router-dom'
import MovieDetail from './MovieDetail'
import MovieVideos from './MovieVideos'
import MovieCredits from './MovieCredits'
import MovieTab from './MovieTab'

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
              <h2 className='title mb-4'>{movie.title}</h2>
              <p className='mb-4'>{movie.overview}</p>
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
                  <MovieTab movie={movie} name={'Детали'} />
                  <MovieTab movie={movie} name={'Видео'} />
                  <MovieTab movie={movie} name={'Актеры'} />
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
