import React from 'react'
import CallApi from '../../../api/api'
import MovieCredit from './MovieCredit'

export default class MovieCredits extends React.Component {
  constructor () {
    super()
    this.state = {
      actor_gallery: []
    }
  }

  getCredits = () => {
    CallApi.get(`/movie/${this.props.match.params.id}/credits`).then(data => {
      const filteredActorsByImage = data.cast.filter(item => {
        return item.profile_path
      })
      this.setState({
        actor_gallery: filteredActorsByImage
      })
    })
  }

  componentDidMount () {
    this.getCredits()
  }

  render () {
    const { actor_gallery } = this.state
  
    return <div>actor_gallery.map(item => {
      actor_gallery.length ? (
        <MovieCredit item={item} />
      ) : (
        <p>Актеры не найдены</p>
      )
    })</div>
  }
}
