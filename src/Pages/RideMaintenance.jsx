import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import Ride from "../Components/Ride";
import logo from "../Components/In-Quire.png";
import RideCheckBox from "../Components/RideCheckBoxes";
import RideDropDown from "../Components/RideDropDown";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { Box, Container, Grid } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

import rideRepair from "../Components/rideRepair";

class RideMaintenance extends Component {
  static contextType = UserContext;

  state = {
    price: 5000,

    duration: 14,
    cartCapacity: 4,

    rides: [],
    team: [],
    temporaryRide: [],
    finances: [],
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
        this.setState({ finances: res.data });
        console.log(res);
      });
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });

    http
      .get(config.apiEndpoint + "/rides/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ rides: res.data });
      });
  }

  //maybe one submit button that calls 2 functions instead of both submitting here??
  formSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
  }

  repairSubmit = (e) => {
    const { team, amount } = this.state;

    //do this for each upgrade we have
    console.log(amount);
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);
    this.context.currentUser.budget = team.budget; //updates the context
    this.setState({ test: true });
    http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );

    //put request here to ride/teamid/rideid
  };

  onBuyRide = (e) => {
    const { history } = this.props;
    history.push("/buyride");
  };

  onFinishPeriod = (e) => {
    console.log("submit");
  };

  onRepair = (e) => {
    const { team } = this.state;

    let status = e.currentTarget.attributes.status.value;
    let purchasePrice = e.currentTarget.attributes.purchasePrice.value;
    let rideID = e.currentTarget.id;
    if (status == 1) {
      toast.success("This ride doesn't need repairs");
      return;
    }
    if (status == 0) {
      toast.error("This ride is broken and cannot be fixed");
      return;
    }

    if (status < 1 && status >= 0.8) {
      let amount = parseInt(purchasePrice, 10) * 0.2;
      const budget = team.budget; // used to set api team.budget
      const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
      if (isBudgetNotNegative < 0) {
        toast.error("You don't have enough money!");
        return;
      }
      team.budget = parseInt(budget, 10) - parseInt(amount, 10);
      this.context.currentUser.budget = team.budget; //updates the context
      this.setState({ test: true });
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        team
      );

      http
        .get(
          config.apiEndpoint +
            "/rides/" +
            this.context.currentUser.teamID +
            "/" +
            rideID
        )
        .then((res) => {
          res.data.status = 1.0;
          http.put(
            config.apiEndpoint +
              "/rides/" +
              this.context.currentUser.teamID +
              "/" +
              rideID,
            res.data
          );
          toast.success("Ride Successfully Repaired, Refresh to See Changes");
        });
      const prevFinance = this.state.finances.rides;
      const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
      this.state.finances.rides = putFinance;
      http.put(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round,
        this.state.finances
      );
    }
    if (status < 0.8 && status >= 0.5) {
      let amount = parseInt(purchasePrice, 10) * 0.2;
      const budget = team.budget; // used to set api team.budget

      const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
      if (isBudgetNotNegative < 0) {
        toast.error("You don't have enough money!");
        return;
      }
      team.budget = parseInt(budget, 10) - parseInt(amount, 10);
      this.context.currentUser.budget = team.budget; //updates the context
      this.setState({ test: true });
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        team
      );
      http
        .get(
          config.apiEndpoint +
            "/rides/" +
            this.context.currentUser.teamID +
            "/" +
            rideID
        )
        .then((res) => {
          res.data.status = 1.0;
          http.put(
            config.apiEndpoint +
              "/rides/" +
              this.context.currentUser.teamID +
              "/" +
              rideID,
            res.data
          );
          toast.success("Ride Successfully Repaired, Refresh to See Changes");
        });
      const prevFinance = this.state.finances.rides;
      const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
      this.state.finances.rides = putFinance;
      http.put(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round,
        this.state.finances
      );
    }
    if (status < 0.5 && status >= 0.3) {
      let amount = parseInt(purchasePrice, 10) * 0.4;
      const budget = team.budget; // used to set api team.budget
      const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
      if (isBudgetNotNegative < 0) {
        toast.error("You don't have enough money!");
        return;
      }
      team.budget = parseInt(budget, 10) - parseInt(amount, 10);
      this.context.currentUser.budget = team.budget; //updates the context
      this.setState({ test: true });
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        team
      );
      http
        .get(
          config.apiEndpoint +
            "/rides/" +
            this.context.currentUser.teamID +
            "/" +
            rideID
        )
        .then((res) => {
          res.data.status = 1.0;
          http.put(
            config.apiEndpoint +
              "/rides/" +
              this.context.currentUser.teamID +
              "/" +
              rideID,
            res.data
          );
          toast.success("Ride Successfully Repaired, Refresh to See Changes");
        });
      const prevFinance = this.state.finances.rides;
      const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
      this.state.finances.rides = putFinance;
      http.put(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round,
        this.state.finances
      );
    }
    if (status < 0.3) {
      let amount = parseInt(purchasePrice, 10) * 0.6;

      const budget = team.budget; // used to set api team.budget
      const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
      if (isBudgetNotNegative < 0) {
        toast.error("You don't have enough money!");
        return;
      }
      team.budget = parseInt(budget, 10) - parseInt(amount, 10);
      this.context.currentUser.budget = team.budget; //updates the context
      this.setState({ test: true });
      http.put(
        config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
        team
      );
      http
        .get(
          config.apiEndpoint +
            "/rides/" +
            this.context.currentUser.teamID +
            "/" +
            rideID
        )
        .then((res) => {
          res.data.status = 1.0;
          http.put(
            config.apiEndpoint +
              "/rides/" +
              this.context.currentUser.teamID +
              "/" +
              rideID,
            res.data
          );
          toast.success("Ride Successfully Repaired, Refresh to See Changes");
        });
      const prevFinance = this.state.finances.rides;
      const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
      this.state.finances.rides = putFinance;
      http.put(
        config.apiEndpoint +
          "/finances/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round,
        this.state.finances
      );
    }

    console.log(e.currentTarget.id);
    console.log(e.currentTarget.name);
    console.log(e.currentTarget.attributes.status.value);
  };

  render() {
    const {} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="Rides"
              budget={this.context.currentUser.budget}
              period={this.context.currentUser.round}
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
                    Ride Maintenance
                  </Box>
                </Grid>
              </Grid>
              <br />

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Ride</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cost to Repair</th>
                    <th scope="col">Repair?</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rides.map((rides) => (
                    <tr key={rides.id}>
                      <td>{rides.description}</td>
                      {rides.status === 1 && <td>Fully Repaired</td>}
                      {rides.status === 1 && <td>N/A</td>}

                      {rides.status === 0 && <td>Ride Broken</td>}
                      {rides.status === 0 && <td>N/A</td>}

                      {rides.status < 1 && rides.status >= 0.8 && (
                        <td>Slightly Damaged</td>
                      )}
                      {rides.status < 1 && rides.status >= 0.8 && (
                        <td>10% of Ride Purchase Price</td>
                      )}
                      {rides.status < 0.8 && rides.status >= 0.5 && (
                        <td> Damaged</td>
                      )}
                      {rides.status < 0.8 && rides.status >= 0.5 && (
                        <td>20% of Ride Purchase Price</td>
                      )}
                      {rides.status < 0.5 && rides.status >= 0.3 && (
                        <td>Heavily Damaged</td>
                      )}
                      {rides.status < 0.5 && rides.status >= 0.3 && (
                        <td>40% of Ride Purchase Price</td>
                      )}
                      {rides.status < 0.3 && <td>Critical Damage</td>}
                      {rides.status < 0.3 && (
                        <td>60% of Ride Purchase Price</td>
                      )}

                      <td>
                        <button
                          disabled={
                            !this.currentUser.isManager &&
                            !this.currentUser.isEngineer
                          }
                          class="btn btn-primary"
                          name={rides.description}
                          id={rides.team_ride_num}
                          purchasePrice={rides.pricepurchased}
                          onClick={this.onRepair}
                          status={rides.status}
                        >
                          Repair
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default RideMaintenance;
