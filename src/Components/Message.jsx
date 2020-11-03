import React from "react";

const Ticket = ({
  name,
  description,
  onChange,
  id,

  stateName,
}) => {
  return (
    <div>
      <h1>Question: </h1>
      <p>{description}</p>
    </div>
  );
};

export default Ticket;
