import React from "react";

function MovieCredit(props) {
  const { credit } = props;
  return (
    <span style={{ display: "inline-block", margin: "5px" }} key={credit.id}>
      <img
        style={{ height: "180px", width: "120px", cursor: "pointer" }}
        src={` https://image.tmdb.org/t/p/w500${credit.profile_path}`}
        // image вынести в компонент
        alt=""
        title={credit.character}
      />
    </span>
  );
}

export default MovieCredit;
