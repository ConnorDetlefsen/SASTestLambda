import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import MarketingPack from "../Components/MarketingPack";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

import FacebookImage from "../Images/Facebook.png";
import InstagramImage from "../Images/instagram.png";
import TVImage from "../Images/TV.png";
import TwitterImage from "../Images/Twitter.png";
import { Twitter } from "@material-ui/icons";

class Features extends Component {
  static contextType = UserContext;

  state = {
    facebook: false,
    twitter: false,
    instagram: false,
    television: false,
    newspaper: false,
    team: [],

    marketingBools: [],

    test: false,

    featureBools: [],
    features: [],

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
      .get(config.apiEndpoint + "/parkoptions") // round | period
      .then((res) => {
        this.setState({
          features: res.data,
        });
      });

    http
      .get(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID
      ) // round | period
      .then((res) => {
        this.setState({
          featureBools: res.data,
        });
      });

    http
      .get(
        config.apiEndpoint +
          "/marketing/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period
      ) // round | period
      .then((res) => {
        console.log(res.data);
        this.setState({
          marketingBools: res.data,
          facebook: res.data.facebook,
          instagram: res.data.instagram,
          television: res.data.television,
          newspaper: res.data.newspaper,
        });
      });
  }

  budgetUpdate = async (team) => {
    const amount = this.state.amount;
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    console.log(isBudgetNotNegative);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);

    const prevFinance = this.state.finances.marketing;
    const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
    this.state.finances.marketing = putFinance;
    const { data1 } = await http.put(
      config.apiEndpoint +
        "/finances/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      this.state.finances
    );
  };

  onClick = (e) => {
    const { team, marketingBools } = this.state;

    const amount = e.currentTarget.value;
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    console.log(isBudgetNotNegative);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);

    this.context.currentUser.budget = team.budget; //updates the context

    const prevFinance = this.state.finances.marketing;
    const putFinance = parseInt(amount, 10) + parseInt(prevFinance, 10);
    this.state.finances.marketing = putFinance;
    http.put(
      config.apiEndpoint +
        "/finances/" +
        this.context.currentUser.teamID +
        "/" +
        this.context.currentUser.round,
      this.state.finances
    );

    this.setState({ test: true });
    http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );

    if (e.currentTarget.name === "Twitter") {
      this.setState({ twitter: true });
      this.state.marketingBools.twitter = true;
      http.put(
        config.apiEndpoint +
          "/marketing/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period,
        marketingBools
      );
      //api calls in here to update booleans
    }
    if (e.currentTarget.name === "Instagram") {
      this.setState({ instagram: true });
      this.state.marketingBools.instagram = true;
      http.put(
        config.apiEndpoint +
          "/marketing/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period,
        marketingBools
      );
    }
    if (e.currentTarget.name === "Facebook") {
      this.setState({ facebook: true });
      this.state.marketingBools.facebook = true;
      http.put(
        config.apiEndpoint +
          "/marketing/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period,
        marketingBools
      );
    }
    if (e.currentTarget.name === "Television") {
      this.setState({ television: true });
      this.state.marketingBools.television = true;
      http.put(
        config.apiEndpoint +
          "/marketing/" +
          this.context.currentUser.teamID +
          "/" +
          this.context.currentUser.round +
          "/" +
          this.context.currentUser.period,
        marketingBools
      );
    }
    if (e.currentTarget.name === "Entry Doggie Bags") {
      this.state.featureBools.feature1 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Park Fans") {
      this.state.featureBools.feature2 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Hand Warmers") {
      this.state.featureBools.feature3 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Rain Ponchos") {
      this.state.featureBools.feature4 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Gift Cards") {
      this.state.featureBools.feature5 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Easter Bunny Photos") {
      this.state.featureBools.feature6 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Santa Photos") {
      this.state.featureBools.feature7 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Halloween Decor") {
      this.state.featureBools.feature8 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Cleaning Once a Week") {
      this.state.featureBools.feature9 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Cleaning Once a Month") {
      this.state.featureBools.feature10 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Cleaning Twice a Week") {
      this.state.featureBools.feature11 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
    if (e.currentTarget.name === "Cleaning Twice a Month") {
      this.state.featureBools.feature12 = true;
      http.put(
        config.apiEndpoint +
          "/parkfeatures/" +
          +this.context.currentUser.round +
          "/" +
          this.context.currentUser.period +
          "/" +
          this.context.currentUser.teamID,
        this.state.featureBools
      );
    }
  };
  onFinishPeriod = (e) => {
    console.log("submit");
  };

  render() {
    const {
      facebook,
      instagram,
      twitter,
      television,
      featureBools,
      features,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />

        <Box display="flex" id="wrapper">
          <Sidebar activePage="features" onFinishPeriod={this.onFinishPeriod} />
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
                    Marketing
                  </Box>
                </Grid>
              </Grid>
              <br />
              <Box class="columns4">
                {facebook === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Facebook"
                      value="5000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {facebook === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Facebook"
                      value="5000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {twitter === true && (
                  <div>
                    <MarketingPack
                      image={TwitterImage}
                      name="Twitter"
                      value="5000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {twitter === false && (
                  <div>
                    <MarketingPack
                      image={TwitterImage}
                      name="Twitter"
                      value="5000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />

                {instagram === true && (
                  <div>
                    <MarketingPack
                      image={InstagramImage}
                      name="Instagram"
                      value="5000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {instagram === false && (
                  <div>
                    <MarketingPack
                      image={InstagramImage}
                      name="Instagram"
                      value="5000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {television === true && (
                  <div>
                    <MarketingPack
                      image={TVImage}
                      name="Television"
                      value="5000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {television === false && (
                  <div>
                    <MarketingPack
                      image={TVImage}
                      name="Television"
                      value="5000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
              </Box>
              <Grid item xs={12}>
                <Box
                  p={1}
                  textAlign="center"
                  fontWeight="fontWeightBold"
                  className="bg-blue box-shadow rounded"
                >
                  Features
                </Box>
              </Grid>
              <br />
              <Box class="columns4">
                {featureBools.feature1 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Entry Doggie Bags"
                      value="6000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature1 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Entry Doggie Bags"
                      value="6000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature2 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Park Fans"
                      value="15000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature2 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Park Fans"
                      value="15000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />

                {featureBools.feature3 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Hand Warmers"
                      value="3000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature3 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Hand Warmers"
                      value="3000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature4 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Rain Ponchos"
                      value="4000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature4 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Rain Ponchos"
                      value="4000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
              </Box>
              <Grid item xs={12}>
                <Box
                  p={1}
                  textAlign="center"
                  fontWeight="fontWeightBold"
                  className="bg-blue box-shadow rounded"
                >
                  Seasonal Features
                </Box>
              </Grid>
              <br />
              <Box class="columns4">
                {featureBools.feature5 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Gift Cards"
                      value="10000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature5 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Gift Cards"
                      value="10000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature6 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Easter Bunny Photos"
                      value="14000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature6 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Easter Bunny Photos"
                      value="14000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />

                {featureBools.feature7 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Santa Photos"
                      value="4000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature7 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Santa Photos"
                      value="4000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature8 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Halloween Decor"
                      value="4000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature8 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Halloween Decor"
                      value="4000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
              </Box>
              <Grid item xs={12}>
                <Box
                  p={1}
                  textAlign="center"
                  fontWeight="fontWeightBold"
                  className="bg-blue box-shadow rounded"
                >
                  Janitorial Options
                </Box>
              </Grid>
              <br />
              <Box class="columns4">
                {featureBools.feature9 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Once a Week"
                      value="6000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature9 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Once a Week"
                      value="6000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature10 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Once a Month"
                      value="2000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature10 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Once a Month"
                      value="2000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />

                {featureBools.feature11 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Twice a Week"
                      value="12000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature11 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Twice a Week"
                      value="12000"
                      onClick={this.onClick}
                      displayButton="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                <br />
                {featureBools.feature12 === true && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Twice a Month"
                      value="4000"
                      onClick={this.onClick}
                      purchased="true"
                      disabled={
                        !this.currentUser.isManager &&
                        !this.currentUser.isMarketing
                      }
                    />
                  </div>
                )}
                {featureBools.feature12 === false && (
                  <div>
                    <MarketingPack
                      image={FacebookImage}
                      name="Cleaning Twice a Month"
                      value="4000"
                      onClick={this.onClick}
                      displayButton="true"
                    />
                  </div>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Features;
