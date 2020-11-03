import React from "react";
import { Box } from "@material-ui/core";
import Refresh from "../Components/Refresh";
import "../App.css"

const NavBar = ({ pagename, budget, period }) => {
  return (
    <Box
      mb={12}
      display="flex"
      className="navbar box-shadow"
    >
       <Refresh></Refresh>
      <h3 >
        Period: {period} | Bank Balance: {budget}
      </h3>

    </Box>
  );
};

export default NavBar;
