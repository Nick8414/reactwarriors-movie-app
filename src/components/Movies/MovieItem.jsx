import React from "react";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">
            {item.title} {item.id}
          </h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          {/* <i className="material-icons">star</i> */}
          <i className="material-icons" onClick={setFavorite}>
            star_border
          </i>
          {/* <i className="material-icons">bookmark</i> */}
          <i className="material-icons">bookmark_border</i>
        </div>
      </div>
    );
  }
}
