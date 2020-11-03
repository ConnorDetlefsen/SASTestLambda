import React, { Component } from "react";
import { Link } from "react-router-dom";

class Refresh extends Component {
  state = {};

  onClick = (e) => {
    const { history } = this.props;
    history.push("/overview");
  };

  render() {
    return (
      <button class="btn btn-warning">
        <Link class="blackFont" to="/overview">
          Refresh Page
        </Link>
      </button>
    );
  }
}

export default Refresh;
