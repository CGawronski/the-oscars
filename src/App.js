import React from "react";

import Header from "./Components/Header/Header";
import MainBody from "./Components/MainBody/MainBody";

function App() {
  return (
    <div className="app">
      <div className="grid-container">
        <Header />
        <MainBody />
      </div>
    </div>
  );
}

export default App;
