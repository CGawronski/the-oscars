import React from "react";

const SearchInput = (props) => {
  return (
    <div className="search">
      <input
        type="search"
        onChange={props.onChange}
        className="search__input"
        placeholder="Search for a movie"
      />
    </div>
  );
};

export default SearchInput;
