import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";
import Message from "../Components/Message";
import { Box, Container, Grid } from "@material-ui/core";
import MessagesCheckBox from "../Components/MessagesCheckBox";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { ToastContainer, toast } from "react-toastify";

class Messages extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      new_message: "",
      errors: {},
      team: [],

      selectValue: "Message to your company",

      submittedMessage: "",
      alreadyAnswered: false,
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    http.post(config.apiEndpoint + "/message/", {
      subject_line: this.state.selectValue,
      message: this.state.new_message,
      team_id: this.context.currentUser.teamID,
      round_num: this.context.currentUser.round,
    });
    toast.success("Message Submitted");
  };
  /*
  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };*/

  handleChange = (e) => {
    this.setState({ new_message: e.target.value });
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

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  notRoundOne() {
    toast.error("You can access this next round! ");
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar
            activePage="messages"
            onFinishPeriod={this.onFinishPeriod}
            onClick={this.notRoundOne}
          />
          <Container id="page-content-wrapper">
            <NavBar
              pagename="map"
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
                    Messages
                  </Box>
                </Grid>
              </Grid>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <br />
                    <Box class="center">
                      <p>Description here of what we want?</p>
                      <label>
                        Subject Line:
                        <select
                          id="dropdown"
                          class=" form-control form-control-sm "
                          onChange={this.handleDropdownChange}
                          value={this.state.selectValue}
                        >
                          <option value="Message to your company">
                            Message to your company
                          </option>
                          <option value="Video to your company">
                            Video to your company
                          </option>
                          <option value="Daily update to the board">
                            Daily update to the board
                          </option>
                        </select>
                      </label>
                      <textarea
                        onChange={this.handleChange}
                        className="form-control"
                        rows="6"
                        cols="10"
                        maxLength={920}
                      ></textarea>
                    </Box>
                  </div>
                  <button
                    disabled={!this.context.currentUser.isManager}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </center>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Messages;
