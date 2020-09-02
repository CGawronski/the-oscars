import React from "react";

const InfoCard = (props) => {
  return (
    <div className={props.className}>
      <h2>{props.heading}</h2>
      <br />
      <p>{props.message}</p>
    </div>
  );
};

export default InfoCard;
