import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";
import { Box, Container, Grid } from "@material-ui/core";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";

class Overview extends Component {
  static contextType = UserContext;
  state = {
    int: 5,
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
  /*
  addFive = (e) => {
    http
      .get(config.oceanEndpoint + "add?a=" + this.state.int)
      .then((res) => {});
    this.context.currentUser.budget =
      this.context.currentUser.budget + this.state.int;
    this.setState({ test: true });
  };*/

  onFinishPeriod = (e) => {
    console.log("submit");
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
    const { history } = this.props;
    history.push("/");
  };
  render() {
    return (
      <React.Fragment>
        <Box display="flex" id="wrapper">
          <Sidebar activePage="overview" onFinishPeriod={this.onFinishPeriod} />
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
                    <p>
                      Welcome to the Statistical Analysis Simulation! The video
                      below gives a brief overview of the game’s learning
                      objectives and outlines the tasks your team will be
                      assigned each round. Please watch this video before
                      beginning, and reference it to help answer questions
                      throughout the simulation. Good luck!
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src="https://www.youtube.com/embed/HSPdlzBB40Q"
                      style={{ width: "100%", minHeight: 300 }}
                    ></iframe>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src="https://www.youtube.com/embed/pWfpxn0xTzo"
                      style={{ width: "100%", minHeight: 300 }}
                    ></iframe>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src=""
                      style={{ width: "100%", minHeight: 300 }}
                    ></iframe>
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

export default Overview;
