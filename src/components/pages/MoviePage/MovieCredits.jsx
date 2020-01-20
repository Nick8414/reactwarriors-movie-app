import React from 'react'
import CallApi from '../../../api/api'

export default class MovieCredits extends React.Component {
  constructor () {
    super()
    this.state = {
      credits: []
    }
  }

  async componentDidMount () {
    const credits = await CallApi.get(`/movie/${this.props.id}/credits`)
    this.setState({ credits })
    console.log('credits')
    console.log(credits)
  }

  render () {
    const { credits } = this.state
    return (
      
        {credits.cast.map(movie => {
          <img
            src={` https://image.tmdb.org/t/p/w500${movie.profile_path}`}
            alt=''
          />
        })}
    
    )
    // ;<div className='mt-4'>
    //   {credits.cast.map(item => {
    //     return (
    //       <img
    //         src={` https://image.tmdb.org/t/p/w500${item.profile_path}`}
    //         alt=''
    //       />
    //     )

    //     // https://image.tmdb.org/t/p/w500//kc3M04QQAuZ9woUvH3Ju5T7ZqG5.jpg

    //     //   <img
    //     //   className="card-img-top card-img--height"
    //     //   src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
    //     //     item.poster_path}`}
    //     //   alt=""
    //     // />
    //   })}
    // </div>
  }
}
