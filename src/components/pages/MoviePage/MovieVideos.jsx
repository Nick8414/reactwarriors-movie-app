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
    const videos = await CallApi.get(
      `/movie/${this.props.match.params.id}/videos`
    )

    this.setState({ videos: videos.results })
  }

  render () {
    const elements = this.state.videos.map(video => {
      return (
        <div key={video.id}>
          <a href={`https://www.themoviedb.org/video/play?key=${video.key}`}>
            {video.name}
          </a>
        </div>
      )
    })

    return <div>{elements}</div>
  }
}
