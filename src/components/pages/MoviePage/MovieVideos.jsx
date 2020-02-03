import React from 'react'
import CallApi from '../../../api/api'
import Loader from 'react-loader-spinner'

export default class MovieVideos extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      videos: null
    }
  }

  async componentDidMount () {
    const videos = await CallApi.get(
      `/movie/${this.props.match.params.id}/videos`
    )

    this.setState({ videos: videos.results, loading: false })
  }

  render () {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    return this.state.loading || this.setState.videos ? (
      <div style={style}>
        <Loader type='CradleLoader' color='#00BFFF' height={100} width={100} />
      </div>
    ) : (
      <div>
        {this.state.videos.map(video => {
          return (
            <div key={video.id}>
              <a
                href={`https://www.themoviedb.org/video/play?key=${video.key}`}
              >
                {video.name}
              </a>
              <iframe
                src={`https://www.themoviedb.org/video/play?key=${video.key}`}
                frameborder='1'
              ></iframe>
            </div>
          )
        })}
      </div>
    )
  }
}
