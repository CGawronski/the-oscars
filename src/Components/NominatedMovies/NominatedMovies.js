import React from "react";

const NominatedMovies = (props) => {
  return props.nominations.map((nomination, index) => {
    return (
      <li
        className=" final-nominations final-nominations__list-item"
        key={index}>
        {nomination.Title}
      </li>
    );
  });
};
export default NominatedMovies;
