import React from "react";

const RideCheckBoxes = ({ name, price, checked, onChange, stateVar }) => {
  return (
    <React.Fragment>
      <label class="form-check-label">
        <input
          type="checkbox"
          stateVar={stateVar}
          checked={checked}
          onChange={onChange}
        />
        {name}: ${price}
      </label>
    </React.Fragment>
  );
};

export default RideCheckBoxes;
