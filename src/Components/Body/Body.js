import Axios from "axios";
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import SearchInput from "../SearchInput/SearchInput";
import ListHeaders from "../ListHeaders/ListHeaders";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import MovieCard from "../MovieCard/MovieCard";
import InfoCard from "../InfoCards/InfoCard";
import SubmissionCard from "../InfoCards/SubmissionCard";
import NominationsList from "../NominationsList/NominationsList";
import NominatedMovies from "../NominatedMovies/NominatedMovies";

class Body extends Component {
  constructor(props) {
    super(props);

    this.timeout = 0;
    this.state = {
      movies: [],
      nominations: [],
      nominationIDs: [],
      nominationsSubmitted: false,
    };
  }

  fetchMovies = async (searchTerm) => {
    const response = await Axios.get("https://www.omdbapi.com/", {
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
    if (this.state.nominationsSubmitted) {
      return this.renderNominatedMovies();
    }
    if (!this.state.movies) {
      return (
        <CSSTransition key={100} timeout={500} classNames="nomination">
          <InfoCard
            className="warning-card"
            heading="Oops! No movies found."
            message="Sorry, we didn't find any titles for that query. Please check your
      spelling or try another title."
          />
        </CSSTransition>
      );
    }
    if (this.state.nominations.length > 4) {
      return (
        <CSSTransition key={101} timeout={500} classNames="nomination">
          <SubmissionCard
            onClick={this.nominateMovies}
            className="warning-card"
            heading="Thanks for voting! You've reached the limit of 5 nominations."
            message="You'll have to remove a nomination to select another movie. Or submit your nominations now!"
          />
        </CSSTransition>
      );
    }
    return this.state.movies.map((movie, index) => {
      if (this.state.nominationIDs.includes(movie.imdbID)) {
        return null;
      } else {
        return (
          <CSSTransition key={index} timeout={500} classNames="nomination">
            <MovieCard
              key={index}
              className="movie-card"
              buttonClass="nominate"
              buttonText="Nominate "
              Poster={movie.Poster}
              Title={movie.Title}
              Year={movie.Year}
              onClick={() => this.fetchNominations(movie.imdbID)}
            />
          </CSSTransition>
        );
      }
    });
  }

  fetchNominations = async (id) => {
    const response = await Axios.get("https://www.omdbapi.com/", {
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
    if (this.state.nominationsSubmitted) {
      return this.state.nominations.map((nomination, index) => {
        return (
          <CSSTransition
            key={index}
            timeout={500}
            classNames="remove-nomination">
            <MovieCard
              key={index}
              className="movie-card movie-card--nomination"
              buttonClass="nominated"
              Poster={nomination.Poster}
              Title={nomination.Title}
              Year={nomination.Year}
            />
          </CSSTransition>
        );
      });
    }
    return this.state.nominations.map((nomination, index) => {
      return (
        <CSSTransition key={index} timeout={500} classNames="remove-nomination">
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
        </CSSTransition>
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

  nominateMovies = () => {
    this.setState({ nominationsSubmitted: true });
  };

  // Need to style and animate this nicely...
  renderNominatedMovies(index) {
    return (
      <>
        <h1 className="final-nomination__title">And the nominees are...</h1>
        <NominatedMovies
          id="fade-in-nominations"
          nominations={this.state.nominations}
        />
      </>
    );
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
