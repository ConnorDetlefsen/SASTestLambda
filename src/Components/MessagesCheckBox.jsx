import React from "react";

const MessagesCheckBox = ({ name, checked, onChange, stateVar }) => {
  return (
    <React.Fragment>
      <label class="form-check-label">
        <input
          type="checkbox"
          stateVar={stateVar}
          checked={checked}
          onChange={onChange}
        />
        {name}
      </label>
    </React.Fragment>
  );
};

export default MessagesCheckBox;
