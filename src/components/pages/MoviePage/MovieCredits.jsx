import React from "react";
import CallApi from "../../../api/api";
import MovieCredit from "./MovieCredit";
import Loader from "react-loader-spinner";

export default class MovieCredits extends React.Component {
  constructor() {
    super();
    this.state = {
      actor_gallery: null,
      loading: true
    };
  }

  getCredits = () => {
    CallApi.get(`/movie/${this.props.match.params.id}/credits`).then(data => {
      const filteredActorsByImage = data.cast.filter(item => {
        return item.profile_path;
      });
      this.setState({
        actor_gallery: filteredActorsByImage,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.getCredits();
  }

  render() {
    const { actor_gallery } = this.state;
    return (
      <div className="mt-4">
        {this.state.loading ? (
          <Loader
            type="CradleLoader"
            color="#00BFFF"
            height={100}
            width={100}
          />
        ) : actor_gallery.length ? (
          actor_gallery.map(item => {
            return <MovieCredit key={item.id} credit={item} />;
          })
        ) : (
          <p className="text-center">Актеры не найдены</p>
        )}
      </div>
    );
  }
}
