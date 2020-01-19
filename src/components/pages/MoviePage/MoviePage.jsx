import React from "react";
import CallApi from "../../../api/api";

export default class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: {}
    };
  }
  async componentDidMount() {
    const movie = await CallApi.get(`/movie/${this.props.match.params.id}`);
    console.log(movie);
  }
  render() {
    return <div>Movie Page</div>;
  }
}
