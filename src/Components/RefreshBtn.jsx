import React from "react";

const RefreshBtn = ({ name, description, value, onClick }) => {
  return (
    <React.Fragment>
      <button
        type="button"
        onClick={onClick}
        class="btn btn-primary"
        name={name}
        id={id}
        className={classname}
      >
        Refresh
      </button>
    </React.Fragment>
  );
};

export default RefreshBtn;
