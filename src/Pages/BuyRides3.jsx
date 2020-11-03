import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import Ride from "../Components/RideSelection";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";
import { FastfoodOutlined } from "@material-ui/icons";

import Scrambler from "../Images/RideImages/scrambler.jpg";
import Tilt from "../Images/RideImages/tilt_a_whirl.jpg";
import Gravitron from "../Images/RideImages/gravitron_ride.jpg";
import Round from "../Images/RideImages/round_up_ride.jpg";
import Zipper from "../Images/RideImages/zipper.jpg";
import Ferris from "../Images/RideImages/ferris_wheel.jpg";
import Bumper from "../Images/RideImages/bumper_cars.jpg";
import Carousel from "../Images/RideImages/carousel.jpg";

class BuyRides3 extends Component {
  static contextType = UserContext;

  state = {
    ride17Purchased: false,
    ride18Purchased: false,
    ride19Purchased: false,
    ride20Purchased: false,
    ride21Purchased: false,
    ride22Purchased: false,
    ride23Purchased: false,
    ride24Purchased: false,

    rideOptions: [],

    ride17: [],
    ride18: [],
    ride19: [],
    ride20: [],
    ride21: [],
    ride22: [],
    ride23: [],
    ride24: [],

    ridePost: {
      row_id: 1,
      team_id: null,
      ride_id: null,
      round_num: 1,
      period_num: 1,
      ride_length: null,
      seats: null,
    },
    ridesPurchased: [],
    finances: [],
  };

  onBackClick = (e) => {
    const { history } = this.props;
    history.push("/buyride2");
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
      .get(
        config.apiEndpoint +
          "/ridespurchased/" +
          this.context.currentUser.teamID
      )
      .then((res) => {
        this.setState({ ridesPurchased: res.data });
      });

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http.get(config.apiEndpoint + "/rideoptions/").then((res) => {
      this.setState({
        rideOptions: res.data,
        ride17: res.data[16],
        ride18: res.data[17],
        ride19: res.data[18],
        ride20: res.data[19],
        ride21: res.data[20],
        ride22: res.data[21],
        ride23: res.data[22],
        ride24: res.data[23],

        // test: res.data.slice(0, 8),
      });
    });
  }

  /*
   {this.state.test.map((test) => (
                <tr key={test.id}>
                  <Ride
                    value={test.price}
                    description={test.description}
                    onClick={(e) => {
                      this.handleClick(e);
                    }}
                    id={test.ride_id}
                    time={test.ride_length}
                  ></Ride>
                  <br></br>
                </tr>
              ))}
              */

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };
  handleClick = (e) => {
    const { team, ridePost } = this.state;

    const amount = e.currentTarget.value;
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
    //end budget check

    let RideLengthTest = parseInt(e.currentTarget.attributes.time.value, 10);
    let rideID = parseInt(e.currentTarget.id, 10);
    let numRides = this.state.team.num_rides + 1;

    http
      .post(config.apiEndpoint + "/rides/", {
        team_id: this.context.currentUser.teamID,
        ride_id: rideID,
        ride_length: RideLengthTest,
        seats: 4,
        description: e.currentTarget.name,
        pricepurchased: amount,
        team_ride_num: numRides,
        status: 1.0,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Ride Bought Sent`);
      });

    let rideVar = "ride" + rideID;
    this.state.ridesPurchased[rideVar] = true;

    http.put(
      config.apiEndpoint + "/ridespurchased/" + this.context.currentUser.teamID,
      this.state.ridesPurchased
    );

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
  };

  onFinishPeriod = (e) => {
    console.log("submit");
  };

  render() {
    const {
      ride17,
      ride18,
      ride19,
      ride20,
      ride21,
      ride22,
      ride23,
      ride24,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="map"
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
                    Buy Rides
                  </Box>
                </Grid>
              </Grid>
              <br />

              <div class="columns4">
                <Ride
                  image={Scrambler}
                  name={ride17.description}
                  value={ride17.price}
                  time={ride17.ride_length}
                  purchased={this.state.ridesPurchased.ride17}
                  onClick={this.handleClick}
                  id={ride17.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Tilt}
                  name={ride18.description}
                  value={ride18.price}
                  time={ride18.ride_length}
                  purchased={this.state.ridesPurchased.ride18}
                  onClick={this.handleClick}
                  id={ride18.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Gravitron}
                  name={ride19.description}
                  value={ride19.price}
                  time={ride19.ride_length}
                  purchased={this.state.ridesPurchased.ride19}
                  onClick={this.handleClick}
                  id={ride19.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Round}
                  name={ride20.description}
                  value={ride20.price}
                  time={ride20.ride_length}
                  purchased={this.state.ridesPurchased.ride20}
                  onClick={this.handleClick}
                  id={ride20.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Zipper}
                  name={ride21.description}
                  value={ride21.price}
                  time={ride21.ride_length}
                  purchased={this.state.ridesPurchased.ride21}
                  onClick={this.handleClick}
                  id={ride21.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Ferris}
                  name={ride22.description}
                  value={ride22.price}
                  time={ride22.ride_length}
                  purchased={this.state.ridesPurchased.ride22}
                  onClick={this.handleClick}
                  id={ride22.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Bumper}
                  name={ride23.description}
                  value={ride23.price}
                  time={ride23.ride_length}
                  purchased={this.state.ridesPurchased.ride23}
                  onClick={this.handleClick}
                  id={ride23.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
                <Ride
                  image={Carousel}
                  name={ride24.description}
                  value={ride24.price}
                  time={ride24.ride_length}
                  purchased={this.state.ridesPurchased.ride24}
                  onClick={this.handleClick}
                  id={ride24.ride_id}
                  disabled={
                    !this.currentUser.isManager && !this.currentUser.isEngineer
                  }
                ></Ride>
              </div>
              <br></br>

              <button
                onClick={this.onBackClick}
                class="btn btn-primary leftButton"
              >
                Back Page
              </button>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default BuyRides3;
