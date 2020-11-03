import React from "react";

const Ride = ({ rideNum, name, pictureLink }) => {
  return (
    <React.Fragment>
      <h1>
        Ride: #{rideNum} {name}
      </h1>
      <img
        class="center"
        src={pictureLink}
        alt="ride pic"
        width="120px"
        height="55px"
      ></img>
      <br />
    </React.Fragment>
  );
};

export default Ride;
