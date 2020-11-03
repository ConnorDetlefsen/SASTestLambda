import React from "react";

const rideRepair = ({
  name,
  value,
  status,

  onClick,
  id,
  damaged,
}) => {
  return (
    <React.Fragment>
      <div class="buyRideCard">
        {damaged === 0 && <h1>Ride has Broken</h1>}
        <div>
          <p>{name}</p>
          <button
            status={status}
            type="button"
            onClick={onClick}
            class="btn btn-primary"
            value={value}
            name={name}
            id={id}
          >
            Repair
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default rideRepair;
