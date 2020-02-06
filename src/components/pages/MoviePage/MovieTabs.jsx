import React from "react";
import MovieTab from "./MovieTab";
import { withRouter } from "react-router-dom";

function MovieTabs(props) {
  const { movie, match } = props;
  console.log(props);
  return (
    <ul className="nav nav-tabs">
      <MovieTab
        movie={match.params.id}
        tabName={"Детали"}
        tabLink={"details"}
      />
      <MovieTab movie={match.params.id} tabName={"Видео"} tabLink={"videos"} />
      <MovieTab
        movie={match.params.id}
        tabName={"Актеры"}
        tabLink={"credits"}
      />
    </ul>
  );
}

export default withRouter(MovieTabs);
