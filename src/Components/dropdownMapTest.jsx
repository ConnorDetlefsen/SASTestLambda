import React from "react";

//id like to read in the values but idk how
const RideDropDown = ({
  label,
  price,
  selectVal,
  onChange,
  value1,
  value2,
  value3,
  value4,
}) => {
  return (
    <React.Fragment>
      <label>
        {label}: ${price}
        <select
          id="dropdown"
          class=" form-control form-control-sm "
          onChange={onChange}
          value={selectVal}
        >
          <option value={value1}>{value1}</option>
          <option value={value2}>{value2}</option>
          <option value={value3}>{value3}</option>
          <option value={value4}>{value4}</option>
        </select>
      </label>
    </React.Fragment>
  );
};

export default RideDropDown;

<label>
  Select an Upgrade: ${price}
  <select
    id="dropdown"
    class=" form-control form-control-sm "
    onChange={this.handleDropdownChange1}
    value={selectValue}
  >
    {updates.map((updates) => (
      <option key={updates.id} value={updates.value}>
        {updates.value}
      </option>
    ))}
  </select>
</label>;
