import React from 'react'
import CallApi from '../../../api/api'
import WatchListIcon from '../../Movies/WatchListIcon'
import FavoriteIcon from '../../Movies/FavoriteIcon'
import { Link, Route, NavLink as RRNavLink, Switch } from 'react-router-dom'
import MovieDetail from './MovieDetail'
import MovieVideos from './MovieVideos'
import MovieCredits from './MovieCredits'

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'

export default class MoviePage extends React.Component {
  constructor () {
    super()
    this.state = {
      movie: {},
      activeTab: '1'
    }
  }

  async componentDidMount () {
    const movie = await CallApi.get(`/movie/${this.props.match.params.id}`)
    console.log(movie)
    this.setState({ movie: movie })
  }
  render () {
    const { movie, activeTab } = this.state

    return (
      <div className='container'>
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
            <h2 className='title mb-4'>{movie.original_title}</h2>
            <p className='mb-4'>{movie.overview}</p>
            <span>Рейтинг пользователей: {movie.popularity}</span>
            <div>
              <FavoriteIcon item={movie} />
              <WatchListIcon item={movie} />
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-12'>
            <Nav tabs>
              <NavItem>
                <NavLink
                  activeClassName='active'
                  tag={RRNavLink}
                  to={`/movie/${movie.id}/details`}
                >
                  Детали
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  activeClassName='active'
                  tag={RRNavLink}
                  to={`/movie/${movie.id}/videos`}
                >
                  Видео
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  activeClassName='active'
                  tag={RRNavLink}
                  to={`/movie/${movie.id}/credits`}
                >
                  Актеры
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    <Switch>
                      <Route
                        exact
                        path='/movie/:id/details'
                        component={() => <MovieDetail movie={movie} />}
                      />

                      <Route
                        exact
                        path='/movie/:id/videos'
                        component={MovieVideos}
                      />

                      <Route
                        exact
                        path='/movie/:id/credits'
                        component={MovieCredits}
                      />
                    </Switch>
                  </Col>
                </Row>
              </TabPane>
              {/* <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    <VideosTab />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>
                    <h4>Tab 3 Contents</h4>
                  </Col>
                </Row>
              </TabPane> */}
            </TabContent>
          </div>
        </div>
      </div>
    )
  }
}
