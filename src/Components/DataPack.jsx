import React from "react";
import InputIcon from "@material-ui/icons/Input";
import LanguageIcon from "@material-ui/icons/Language";

const DataPack = ({
  name,
  description,
  value,
  onClick,
  id,
  disabled,
  isPurchased,
  dataLink,
}) => {
  return (
    <React.Fragment>
      <div class="dataPack box-shadow">
        <LanguageIcon />
        <h5>{name}</h5>
        <p>{description}</p>

        <button
          type="button"
          onClick={onClick}
          class="btn btn-primary dataPackButton"
          value={value}
          name={name}
          id={id}
          disabled={disabled}
        >
          ${value} <span />
          <InputIcon />
        </button>
        {isPurchased && (
          <div>
            <p>Purchased</p>
            <a href={dataLink} download>
              Data Download
            </a>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DataPack;
