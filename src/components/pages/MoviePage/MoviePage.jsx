import React from "react";
import CallApi from "../../../api/api";
import WatchListIcon from "../../Movies/WatchListIcon"
import FavoriteIcon from "../../Movies/FavoriteIcon"

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      activeTab:'1'
    };
  }
  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  }

  async componentDidMount() {
    const movie = await CallApi.get(`/movie/${this.props.match.params.id}`);
    console.log(movie);
    this.setState({movie:movie})
    
  }
  render() {
    const {movie, activeTab} = this.state;
    
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <img className="card-img-top card-img--height" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt="" />
          </div>
          <div className="col-8">
            <h2 className="title mb-4">{movie.original_title}</h2>
              <p className="mb-4">{movie.overview}</p>
              <span>Рейтинг пользователей: {movie.popularity}</span>
              <div>
                <FavoriteIcon item={movie} />
                <WatchListIcon item={movie} />
              </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                  href="#"
                >
                  Детали
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                  href="#"
                >
                  Похожие фильмы
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                  href="#"
                >
                  Актеры
                </NavLink>
              </NavItem>
            </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Tab 2 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>Tab 3 Contents</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
          </div>

        </div>
      </div>
    )
  }
}
