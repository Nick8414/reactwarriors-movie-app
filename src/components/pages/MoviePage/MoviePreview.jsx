import React from 'react'
import WatchListIcon from '../../Movies/WatchListIcon'
import FavoriteIcon from '../../Movies/FavoriteIcon'

function MoviePreview(props) {
    const {movie} = props
    return (
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
    )
}

export default MoviePreview