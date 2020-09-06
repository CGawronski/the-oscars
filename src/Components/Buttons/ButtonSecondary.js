import React from "react";

const Button = (props) => {
  return (
    <button
      className={props.className}
      text={props.text}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
