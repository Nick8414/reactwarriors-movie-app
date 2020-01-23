import React from 'react'

class MovieDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  render () {
    const { movie } = this.props
    return (
      <table className='table'>
        <tbody>
          <tr>
            <td>Статус</td>
            <td>{movie.status}</td>
          </tr>
          <tr>
            <td>Дата выхода</td>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <td>Продолжительность</td>
            <td>{movie.runtime}</td>
          </tr>
          <tr>
            <td>Язык оригинала</td>
            <td>{movie.original_language}</td>
          </tr>
          <tr>
            <td>Страна</td>
            <td>
              {movie.production_countries.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
            </td>
          </tr>
          <tr>
            <td>Бюджет</td>
            <td>{movie.budget}</td>
          </tr>
          <tr>
            <td>Сборы</td>
            <td>{movie.revenue}</td>
          </tr>
          <tr>
            <td>Компания</td>
            <td>
              {movie.production_companies.map(company => (
                <div key={company.id}>
                  <span className='badge badge-info mr-4'>{company.name}</span>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>Жанры</td>
            <td>
              {movie.genres.map(genre => (
                <div key={genre.id}>
                  <span className='badge badge-info mr-4'>{genre.name}</span>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default MovieDetail
