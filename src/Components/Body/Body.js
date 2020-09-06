import Axios from "axios";
import React, { Component } from "react";

import SearchInput from "../SearchInput/SearchInput";
import ListHeaders from "../ListHeaders/ListHeaders";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import MovieCard from "../MovieCard/MovieCard";
import InfoCard from "../InfoCard/InfoCard";
import NominationsList from "../NominationsList/NominationsList";

import ReactCSSTransitionGroup from "react-transition-group";

class Body extends Component {
  constructor(props) {
    super(props);

    this.timeout = 0;
    this.state = {
      movies: [],
      nominations: [],
      nominationIDs: [],
    };
  }

  fetchMovies = async (searchTerm) => {
    const response = await Axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2dcf7309",
        s: searchTerm.trim(),
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
      this.fetchMovies(searchTerm);
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
    if (this.state.nominations.length > 4) {
      return (
        <InfoCard
          className="warning-card"
          heading="You've reached the nominations limit!"
          message="You'll have to remove a nomination to add another one."
        />
      );
    }

    return this.state.movies.map((movie, index) => {
      if (this.state.nominationIDs.includes(movie.imdbID)) {
        return null;
      } else {
        return (
          <MovieCard
            key={index}
            className="movie-card"
            buttonClass="nominate"
            buttonText="Nominate me!"
            Poster={movie.Poster}
            Title={movie.Title}
            Year={movie.Year}
            onClick={() => this.fetchNominations(movie.imdbID)}
          />
        );
      }
    });
  }

  fetchNominations = async (id) => {
    const response = await Axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "2dcf7309",
        i: id,
        type: "movie",
      },
    });
    this.setState({
      nominations: [...this.state.nominations, response.data],
      nominationIDs: [...this.state.nominationIDs, response.data.imdbID],
    });
  };

  handleRemoveNomination(id) {
    const newNominations = this.state.nominations.filter(
      (nomination) => nomination.imdbID !== id
    );
    const newIDs = this.state.nominationIDs.filter(
      (nomination) => nomination !== id
    );
    this.setState({ nominations: newNominations, nominationIDs: newIDs });
  }

  renderNominationsList() {
    if (!this.state.nominations) {
      return;
    }
    return this.state.nominations.map((nomination, index) => {
      return (
        <MovieCard
          key={index}
          className="movie-card movie-card--nomination"
          buttonClass="remove-nomination"
          buttonText="Remove"
          Poster={nomination.Poster}
          Title={nomination.Title}
          Year={nomination.Year}
          onClick={() => this.handleRemoveNomination(nomination.imdbID)}
        />
      );
    });
  }

  nominationsLeft() {
    return this.state.nominations.length;
  }

  renderListHeaders() {
    const headers = <ListHeaders nominationsLeft={this.nominationsLeft()} />;
    if (this.state.nominations.length) {
      return headers;
    }
    return this.state.movies === undefined || !this.state.movies.length
      ? null
      : headers;
  }

  render() {
    return (
      <div className="body">
        <SearchInput onChange={this.handleChange} />
        {this.renderListHeaders()}
        <SearchResultsList renderMovieList={this.renderMovieList()} />
        <NominationsList renderNominationsList={this.renderNominationsList()} />
      </div>
    );
  }
}

export default Body;
