import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

class Finances extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      finances: [],
      team: [],

      rides: 0.0,
      marketing: 0.0,
      data: 0.0,
      fixed: 0.0,
      legal: 0.0,
      revenue: 0.0,
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
    http
      .get(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round
      )
      .then((res) => {
        this.setState({
          rides: res.data.rides,
          marketing: res.data.marketing,
          data: res.data.data,
          fixed: res.data.fixed,
          legal: res.data.legal,
          revenue: res.data.revenue,
        });

        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
  }

  onFinishPeriod = (e) => {
    console.log("submit");
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="finances" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Marketing"
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
                    Finances
                  </Box>
                </Grid>
              </Grid>

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Revenue</td>
                    <td>{this.state.revenue}</td>
                  </tr>
                  <tr>
                    <td>Ride Purchases</td>
                    <td>{this.state.rides}</td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>{this.state.marketing}</td>
                  </tr>
                  <tr>
                    <td>Data Purchases </td>
                    <td>{this.state.data}</td>
                  </tr>
                  <tr>
                    <td>Fixed Costs</td>
                    <td>{this.state.fixed}</td>
                  </tr>
                  <tr>
                    <td>Legal Costs</td>
                    <td>{this.state.legal}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Finances;
