import React from "react";

const RideSelection = ({
  name,
  value,
  time,
  image,
  stateVar,
  checked,
  onChange,
  purchased,
  displayButton,
  onClick,
  id,
  disabled,
}) => {
  return (
    <React.Fragment>
      <div class="buyRideCard">
        <img class="center rideImage" src={image} alt="ride pic"></img>
        <div>
          <p>{name}</p>
          <p>
            ${value} | {time} Minutes
          </p>

          <br />
          {!purchased && (
            <button
              time={time}
              type="button"
              onClick={onClick}
              class="btn btn-primary"
              value={value}
              name={name}
              id={id}
              stateVar={stateVar}
              disabled={disabled}
            >
              Purchase: ${value}
            </button>
          )}
          {purchased && <h4>Purchased</h4>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RideSelection;
