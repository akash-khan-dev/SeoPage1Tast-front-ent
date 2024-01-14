import React from "react";

const CardHeading = () => {
  return (
    <div className="card_heading">
      <div className="incomplete_container">
        <span className="incomplete_badge"></span>
        <span>Incomplete</span>
      </div>
      <div className="incomplete_count">
        <span>0</span>
      </div>
    </div>
  );
};

export default CardHeading;
