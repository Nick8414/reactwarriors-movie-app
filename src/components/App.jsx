import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();



export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: []
      },
      page: 1,
      total_pages: 0
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  }

  onChangeFilters = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    }
    this.setState({
      filters: newFilters
    })
  }

  onChangePage = (page) => {
    this.setState({
      page
    });
  };

  onChangeTotalPage = (total_pages) => {
    this.setState({
      total_pages
    });
  };

  setDefaultFilters = () => {
    this.setState({
      filters: {
        sort_by: "vote_average.asc",
        primary_release_year: 2019,
        with_genres: ""
      },
      page: 1
    })
  }

  async componentDidMount() {
    const session_id = cookies.get("session_id");
      if (session_id) {
        const user = await fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`);
        this.updateUser(user);
      } 
   } 

  render() {
    const {filters, page, total_pages, user } = this.state;
    return (
      <React.Fragment>
        <Header
          user={user}
          updateSessionId={this.updateSessionId}
          updateUser={this.updateUser}
        />
        <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters} 
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  onChangeFiltersGenre={this.onChangeFiltersGenre}
                  setDefaultFilters={this.setDefaultFilters}
                />
              </div>
            </div>
          </div>
            <div className="col-8">
              <MoviesList 
                filters={filters} 
                page={page} 
                onChangePage={this.onChangePage}
                onChangeTotalPage={this.onChangeTotalPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
      
    );
  }
}
