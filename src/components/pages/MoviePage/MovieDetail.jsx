import React from 'react'
import { Table } from 'reactstrap'

const MovieDetail = props => {
  const { movie } = props
  console.log(movie.production_countries)
  //const countries = movie.production_countries.map(item => item.name).join(', ')
  return (
    <Table>
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
          {/* <td>{countries}</td> */}
        </tr>
        <tr>
          <td>Бюджет</td>
          <td>{movie.budget}</td>
        </tr>
        <tr>
          <td>Сборы</td>
          <td>{movie.status}</td>
        </tr>
        <tr>
          <td>Компания</td>
          <td>{movie.status}</td>
        </tr>
        <tr>
          <td>Жанры</td>
          <td>{movie.status}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default MovieDetail
