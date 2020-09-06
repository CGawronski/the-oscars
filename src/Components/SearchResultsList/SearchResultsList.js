import React from "react";

import { TransitionGroup } from "react-transition-group";

const SearchResultsList = (props) => {
  return (
    <TransitionGroup className="search-results-list">
      {props.renderMovieList}
    </TransitionGroup>
  );
};

export default SearchResultsList;
