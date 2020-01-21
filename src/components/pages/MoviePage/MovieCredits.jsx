import React from 'react'
import CallApi from '../../../api/api'

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
    const elements = actor_gallery.map(item => {
      return (
        <span style={{ display: 'inline-block', margin: '5px' }} key={item.id}>
          <img
            style={{ height: '180px', width: '120px' }}
            src={` https://image.tmdb.org/t/p/w500${item.profile_path}`}
            alt=''
          />
        </span>
      )
    })
    return <div>{elements}</div>
  }
}
