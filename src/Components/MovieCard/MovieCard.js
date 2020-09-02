// LEFT OFF
// NEED TO ADD NOMINATIONS STATE HANDLER IN MAIN AND PASS HERE TO CARD COMPONENT
// ONCLICK NOMINATION BUTTON ONCLICK={THIS.PROPS.HandleNOMINATE}

import React from "react";

import Button from "../Buttons/Button";

const MovieCard = (props) => {
  return (
    <div className={props.class}>
      <img
        src={props.Poster}
        alt="Movie poster"
        className="movie-card__poster"
      />
      <div>
        <h2 className="movie-card__title">
          {props.Title} ({props.Year})
        </h2>
      </div>

      <Button className="nominate" text="Nominate me!" />
    </div>
  );
};

export default MovieCard;
