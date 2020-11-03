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
  };

  render() {
    return (
      <React.Fragment>
        <Box display="flex" id="wrapper">
          <Sidebar activePage="overview" onFinishPeriod={this.onFinishPeriod} />
          <Container id="page-content-wrapper">
            <NavBar
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
                    Round {this.context.currentUser.round}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box p={2} className="bg-lightblue box-shadow rounded">
                    <p>
                      Lorem ipsum dolor sit amet, at illud delicata definitionem
                      nec. Eu vix omnium animal, ius quas fierent ad, vix omnes
                      theophrastus ea. Nobis corpora cu sea, ne accusam officiis
                      eum. Ne vel euismod nostrum. Latine tamquam suavitate nec
                      at.Ea idque apeirian eos, vim dicat moderatius te. Vel
                      natum solum corpora ea. Viderer tacimates qualisque et
                      est, no ius percipit splendide mediocritatem, laudem
                      bonorum accusam ut per. In oportere reformidans quo, et
                      ius suscipit erroribus, novum tractatos ei vix. Quo wisi
                      veniam id. Saepe salutandi voluptaria ad cum.{" "}
                    </p>
                    <p>
                      Nostrum quaestio splendide id sit. Ex enim solet vix. Per
                      ei gloriatur democritum, stet iriure expetendis at vel, in
                      usu mazim viris libris. Doctus cetero fabellas qui ex, vim
                      nisl fuisset ne, sea eu laoreet corrumpit necessitatibus.
                      Sit et falli accusata similique, eu iudico delenit vim.
                      Laudem volutpat prodesset ei vim, eripuit facilisis
                      dignissim nam ei, sit ea graece doctus gloriatur. Vis
                      brute saperet eu, errem recteque suscipiantur vis ea, ei
                      vix dicit luptatum molestiae.{" "}
                    </p>
                    <p>
                      Et vidit accusamus contentiones pri, his tale facer et.
                      Hinc facer commodo ex sed. Movet scaevola conceptam id
                      qui, facer alterum cum id, lucilius eloquentiam ea his.
                      Sea falli tantas ea, ea pri mentitum sententiae, te mel
                      congue rationibus. Ea quod regione eum, cum ei eius soluta
                      oblique, nam no omnis recusabo.
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src="https://www.youtube.com/embed/tgbNymZ7vqY"
                      style={{ width: "100%", minHeight: 300 }}
                    ></iframe>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src="https://www.youtube.com/embed/tgbNymZ7vqY"
                      style={{ width: "100%", minHeight: 300 }}
                    ></iframe>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className="rounded">
                    <iframe
                      src="https://www.youtube.com/embed/tgbNymZ7vqY"
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
