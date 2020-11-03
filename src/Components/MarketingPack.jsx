import React from "react";

const MarketingPack = ({
  name,
  image,
  value,
  onClick,
  purchased,
  displayButton,
  disabled,
}) => {
  return (
    <div class="cardData">
      <img
        class="center"
        src={image}
        alt="marketing pic"
        height="60"
        width="60"
      ></img>
      <h5>{name}</h5>
      {displayButton && (
        <button
          disabled={disabled}
          type="button"
          onClick={onClick}
          class="btn btn-primary"
          value={value}
          name={name}
        >
          Purchase: ${value}
        </button>
      )}
      {purchased && <h4>Purchased</h4>}
    </div>
  );
};

export default MarketingPack;
