import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";
import { Box, Container, Grid } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";

class confirmFinish extends Component {
  static contextType = UserContext;
  state = {
    test: false,
    team: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.email === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        console.log(res);
        if (res.data.isroundover === true) {
          history.push("/");
        }
      });

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });
  }

  onFinishPeriod = (e) => {
    console.log("submit");
    if (this.state.team.period_num === 5) {
      this.state.team.period_num = 1;

      this.state.team.isroundover = true;
      this.state.team.round_num = this.state.team.round_num + 1;
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        this.state.team
      );
      http
        .get(
          config.oceanEndpoint +
            "sale?p=" +
            this.context.currentUser.period +
            "&r=" +
            this.context.currentUser.round +
            "&t=" +
            this.context.currentUser.teamID
        )
        .then((res) => {});
      toast.success("Round Finished, Come back tomorrow for the next!");

      const { history } = this.props;
      history.push("/");
    } else {
      http
        .get(
          config.oceanEndpoint +
            "sale?p=" +
            this.context.currentUser.period +
            "&r=" +
            this.context.currentUser.round +
            "&t=" +
            this.context.currentUser.teamID
        )
        .then((res) => {});

      this.state.team.period_num = this.state.team.period_num + 1;
      this.state.team.isroundover = true;
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        this.state.team
      );
      toast.success(
        "Period Finished, Come back in 5 minutes for the next Period."
      );
      const { history } = this.props;
      history.push("/");
    }
  };

  notRoundOne() {
    toast.error("You can access this next round! ");
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar activePage="finish" />
          <Container id="page-content-wrapper">
            <NavBar
              budget={this.context.currentUser.budget}
              period={this.context.currentUser.period}
            />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Round {this.context.currentUser.round}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box p={2} className="bg-lightblue box-shadow rounded">
                    <div class="center">
                      <button
                        className="btn btn-primary "
                        onClick={this.onFinishPeriod}
                        disabled={!this.context.currentUser.isManager}
                      >
                        Finish Period
                      </button>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default confirmFinish;
