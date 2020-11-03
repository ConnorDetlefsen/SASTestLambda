import React from "react";

const Ticket = ({ databasename, name, description, onClick, id, selected }) => {
  return (
    <div class="cardData">
      <button
        type="button"
        onClick={onClick}
        class="btn ticket rounded box-shadow"
        databasename={databasename}
        name={name}
        id={id}
      >
        <h5>Option: {id}</h5>
        <p>{description}</p>
        {selected && <p>Currently Selected</p>}
      </button>
    </div>
  );
};

export default Ticket;
