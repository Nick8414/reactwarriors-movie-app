import React from 'react'
import MovieTab from './MovieTab'

function MovieTabs(props) {
    const {movie} = props
    return (
        <ul className='nav nav-tabs'> 
        <MovieTab movie={movie} name={'Детали'} />
        <MovieTab movie={movie} name={'Видео'} />
        <MovieTab movie={movie} name={'Актеры'} />
      </ul>
    )

}

export default MovieTabs