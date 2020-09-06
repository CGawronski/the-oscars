import React from "react";

import { TransitionGroup } from "react-transition-group";

const NominationsList = (props) => {
  return (
    <TransitionGroup className="nominations-list">
      {props.renderNominationsList}
    </TransitionGroup>
  );
};

export default NominationsList;
