import React from "react";

import Button from "../Buttons/Button";

const InfoCard = (props) => {
  return (
    <div className={props.className}>
      <h2>{props.heading}</h2>
      <br />
      <p>{props.message}</p>
      <Button
        className="submit-nominations"
        text="Submit"
        onClick={props.onClick}
      />
    </div>
  );
};

export default InfoCard;
