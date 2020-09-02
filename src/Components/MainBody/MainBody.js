import Axios from "axios";
import React, { Component } from "react";

import SearchInput from "../SearchInput/SearchInput";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import MovieCard from "../MovieCard/MovieCard";
import InfoCard from "../InfoCard/InfoCard";

class MainBody extends Component {
  constructor(props) {
    super(props);

    this.timeout = 0;
    this.state = {
      movies: [],
      nominations: [],
    };
  }

  fetchData = async (searchTerm) => {
    const response = await Axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2dcf7309",
        s: searchTerm,
        type: "movie",
      },
    });

    this.setState({ movies: response.data.Search });
  };

  // Debounce the API request
  handleChange = (event) => {
    let searchTerm = event.target.value;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.fetchData(searchTerm);
    }, 500);
  };

  renderMovieList() {
    if (!this.state.movies) {
      return (
        <InfoCard
          className="warning-card"
          heading="Oops! No movies found."
          message="Sorry, we didn't find any titles for that query. Please check your
      spelling or try another title."
        />
      );
    }
    return this.state.movies.map((movie) => {
      return (
        <MovieCard
          class="movie-card"
          Poster={movie.Poster}
          Title={movie.Title}
          Year={movie.Year}
        />
      );
    });
  }

  render() {
    return (
      <div className="main-body">
        <SearchInput onChange={this.handleChange} />
        <SearchResultsList renderMovieList={this.renderMovieList()} />
      </div>
    );
  }
}

export default MainBody;
