import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

class Inbox extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      team: [],
      message1: [],
      message2: [],
      message3: [],
      message4: [],

      inbox: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.email === null) {
      history.push("/");
    }
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        console.log(res);
        if (res.data.isRoundOver === true) {
          history.push("/");
        }
      });

    if (this.context.currentUser.isFinance === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/finance"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
        });
    }
    if (this.context.currentUser.isManager === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/manager"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
        });
    }
    if (this.context.currentUser.isConsultant === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/consultant"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,

            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
        });
    }
    if (this.context.currentUser.isMarketing === true) {
      http
        .get(
          config.apiEndpoint +
            "/inbox/" +
            this.context.currentUser.teamID +
            "/" +
            this.context.currentUser.round +
            "/" +
            this.context.currentUser.period +
            "/marketing"
        )
        .then((res) => {
          this.setState({
            inbox: res.data,
            message1: res.data[0],
            message2: res.data[1],
            message3: res.data[2],
            message4: res.data[3],
          });
        });
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });
  }

  onFinishPeriod = (e) => {
    console.log("submit");
  };

  render() {
    const { inbox, message1, message2, message3, message4 } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar activePage="inbox" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Inbox"
              budget={this.context.currentUser.budget}
              period={this.context.currentUser.round}
            />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Inbox
                  </Box>
                </Grid>
              </Grid>
              <br />
              <div>
                <center>
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Date</th>

                        <th scope="col">Sender</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inbox && !message1 && (
                        <tr>
                          <td>{inbox.sender}</td>
                          <td>{inbox.message}</td>
                          <td>{("" + inbox.stamp).substring(0, 10)}</td>
                        </tr>
                      )}
                      {message1 && (
                        <tr>
                          <td>{message1.sender}</td>
                          <td>{message1.message}</td>
                          <td>{("" + message1.stamp).substring(0, 10)}</td>
                        </tr>
                      )}
                      {message2 && (
                        <tr>
                          <td>{message2.sender}</td>
                          <td>{message2.message}</td>
                          <td>{("" + message2.stamp).substring(0, 10)}</td>
                        </tr>
                      )}
                      {message3 && (
                        <tr>
                          <td>{message3.sender}</td>
                          <td>{message3.message}</td>
                          <td>{("" + message3.stamp).substring(0, 10)}</td>
                        </tr>
                      )}
                      {message4 && (
                        <tr>
                          <td>{message4.sender}</td>
                          <td>{message4.message}</td>
                          <td>{("" + message4.stamp).substring(0, 10)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </center>
              </div>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Inbox;
