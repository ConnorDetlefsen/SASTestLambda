import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import Ticket from "../Components/Ticket";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

class Tickets extends Component {
  static contextType = UserContext;

  state = {
    option1: false, //read these values in
    option2: false,

    option3: false,
    option4: false,

    //selected: false,

    option1Name: "option 1 name",
    option1Description: "option 1 description",

    option2Name: "option 2 name",
    option2Description: "option 2 description",

    option3Name: "option 3 name",
    option3Description: "option 3 description",

    option4Name: "option 4 name",
    option4Description: "option 4 description",

    teamTickets: [],
    ticketOptions: [],
    ticketBundles: [],
    ticketDiscounts: [],
    team: [],

    test: false,
  };

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.email === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
      });

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
          "/tickets/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID
      )
      .then((res) => {
        this.setState({ teamTickets: res.data });
      });
    http.get(config.apiEndpoint + "/ticketoptions/").then((res) => {
      this.setState({ ticketOptions: res.data });
    });
    http.get(config.apiEndpoint + "/ticketbundle/").then((res) => {
      this.setState({ ticketBundles: res.data });
    });
    http.get(config.apiEndpoint + "/ticketdiscounts/").then((res) => {
      this.setState({ ticketDiscounts: res.data });
    });
  }
  /*
  changeColor() {
    //used to c
    this.setState({ selected: !this.state.selected });
  }
*/
  handleClick = (e) => {
    if (!this.context.currentUser.isManager) {
      toast.error("Only the manager can submit ticket options.");
      return;
    }

    let type = e.currentTarget.attributes.databasename.value;
    let displayName = e.currentTarget.name;
    let id = e.currentTarget.id;
    this.state.teamTickets[type] = id;
    toast.success(displayName + " Option " + id + " Selected");
    http.put(
      config.apiEndpoint +
        "/tickets/" +
        this.context.currentUser.round +
        "/" +
        this.context.currentUser.period +
        "/" +
        this.context.currentUser.teamID,
      this.state.teamTickets
    );
    this.setState({ test: true });
  };

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
    //let btn_class = (this.state.selected = "selected");
    const { teamTickets } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar
            activePage="tickets"
            onFinishPeriod={this.onFinishPeriod}
            onClick={this.notRoundOne}
          />
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
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Ticket Choices
                  </Box>
                  <br />
                </Grid>

                <Grid item xs={4}>
                  <Box className="rounded center">
                    <br />
                    <h1 class="center">Adult and Child</h1>
                    <p>
                      Currently Selected: Option {teamTickets.adult_children}
                    </p>
                    <br />
                    {this.state.ticketOptions.map((ticketOptions) => (
                      <tr key={ticketOptions.id}>
                        <Ticket
                          name="Adult and Child"
                          databasename="adult_children"
                          description={ticketOptions.description}
                          onClick={(e) => {
                            this.handleClick(e);
                          }}
                          id={ticketOptions.option_id}
                          // selected={this.state.option[ticketOptions.id]}
                        ></Ticket>
                        <br />
                      </tr>
                    ))}
                  </Box>
                </Grid>
                <br />
                <Grid item xs={4}>
                  <Box className="rounded center">
                    <br />
                    <h1 class="center">Bundles</h1>
                    <p>Currently Selected: Option {teamTickets.bundle}</p>
                    <br />
                    {this.state.ticketBundles.map((ticketBundles) => (
                      <tr key={ticketBundles.id}>
                        <Ticket
                          name="Bundle"
                          databasename="bundle"
                          description={ticketBundles.description}
                          onClick={(e) => {
                            this.handleClick(e);
                          }}
                          id={ticketBundles.bundle_id}
                          // selected={this.state.option[ticketOptions.id]}
                        ></Ticket>
                        <br />
                      </tr>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded center">
                    <br />
                    <h1 class="center">Discounts</h1>
                    <p>Currently Selected: Option {teamTickets.discount}</p>
                    <br />
                    {this.state.ticketDiscounts.map((ticketDiscounts) => (
                      <tr key={ticketDiscounts.id}>
                        <Ticket
                          name="Discount"
                          databasename="discount"
                          description={ticketDiscounts.description}
                          onClick={(e) => {
                            this.handleClick(e);
                          }}
                          id={ticketDiscounts.discount_id}
                          // selected={this.state.option[ticketOptions.id]}
                        ></Ticket>
                        <br />
                      </tr>
                    ))}
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

export default Tickets;
