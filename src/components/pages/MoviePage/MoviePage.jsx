import React from "react";
import CallApi from "../../../api/api";

import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

import MoviePreview from "./MoviePreview";
import MovieTabs from "./MovieTabs";

export default class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getMovie(this.props.match.params.id);
    }
  }

  getMovie(movie_id) {
    CallApi.get(`/movie/${movie_id}`).then(data => {
      this.setState({
        movie: data
      });
    });
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  render() {
    const { movie } = this.state;
    return (
      movie && (
        <div className="container">
          <MoviePreview movie={movie} />

          <div className="row mt-4">
            <div className="col-12">
              <div>
                {/* в отдельный компонент Виз Роутер */}

                <MovieTabs movie={movie} />

                <div className="tab-content">
                  <Switch>
                    <Route
                      path="/movie/:id/details"
                      render={routerProps => (
                        <MovieDetail {...routerProps} movie={movie} />
                      )}
                    />
                    <Route path="/movie/:id/videos" component={MovieVideos} />
                    <Route path="/movie/:id/credits" component={MovieCredits} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
