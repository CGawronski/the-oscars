import React from "react";

const ListHeaders = (props) => {
  return (
    <div className="list-headers">
      <div className="list-headers__search">
        <h2>Movies</h2>
      </div>
      <div className="list-headers__nominations">
        <h2>Your Nominations ({props.nominationsLeft} / 5)</h2>
      </div>
    </div>
  );
};

export default ListHeaders;
