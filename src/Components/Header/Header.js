import React from "react";

import logo from "../../assets/oscars.png";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header__logo" />
      <div className="header__styled-text">THE</div>
      <h1 className="header__title">oscars</h1>
    </div>
  );
};

export default Header;
