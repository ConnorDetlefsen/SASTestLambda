import React from "react";

const DataPackDownload = ({ isPurchased, dataLink }) => {
  return (
    <React.Fragment>
      {isPurchased && (
        <div>
          <p>Purchased</p>
          <a href={dataLink} download>
            Data Download
          </a>
        </div>
      )}
    </React.Fragment>
  );
};

export default DataPackDownload;
