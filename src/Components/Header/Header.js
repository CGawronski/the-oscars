import React from "react";

import logo from "../../assets/shoppies-logo-4.png";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header__logo" />

      <div className="header__styled-text">THE</div>
      <h1 className="header__title">SHOPPIES</h1>
    </div>
  );
};

export default Header;
