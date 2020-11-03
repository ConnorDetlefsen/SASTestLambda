import React from "react";

const RideDropDown = ({ name, value, onChange, stateVar }) => {
  return (
    <React.Fragment>
      <label>
        {name}: {value}
        <select
          id="dropdown"
          class=" form-control form-control-sm "
          onChange={onChange}
          value={value}
          stateVar={stateVar}
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>
    </React.Fragment>
  );
};

export default RideDropDown;
