import React from "react";

import logo from "../../assets/shoppies-logo-4.png";

const Header = () => {
  return (
    // These aren't React components just add the keyframes animations
    <div className="header">
      <img src={logo} className="header__logo" />
      <div className="header__styled-text">THE</div>
      <h1 className="header__title">SHOPPIES</h1>
    </div>
  );
};

export default Header;
