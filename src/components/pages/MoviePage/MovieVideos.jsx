import React from 'react'
import CallApi from '../../../api/api'

export default class MovieVideos extends React.Component {
  constructor () {
    super()
    this.state = {
      videos: []
    }
  }

  async componentDidMount () {
    // console.log('this.props')
    // console.log(this.props)
    const videos = await CallApi.get(
      `/movie/${this.props.match.params.id}/videos`
    )
    console.log('videos')
    console.log(videos)
  }

  render () {
    console.log(this.props)
    return <div>https://www.themoviedb.org/video/play?key=t6g0dsQzfqY</div>
  }
}
