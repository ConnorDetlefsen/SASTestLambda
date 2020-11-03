import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";

import MapImage from "../Images/map.jpg";
import WeatherA from "../Images/WeatherImages/WeatherA.png";
import WeatherB from "../Images/WeatherImages/WeatherB.png";
import WeatherC from "../Images/WeatherImages/WeatherC.png";
import WeatherD from "../Images/WeatherImages/WeatherD.png";
import WeatherE from "../Images/WeatherImages/WeatherE.png";
import WeatherF from "../Images/WeatherImages/WeatherF.png";
import WeatherG from "../Images/WeatherImages/WeatherG.png";
import WeatherH from "../Images/WeatherImages/WeatherH.png";
import WeatherI from "../Images/WeatherImages/WeatherI.png";
import WeatherJ from "../Images/WeatherImages/WeatherJ.png";
import WeatherK from "../Images/WeatherImages/WeatherK.png";
import WeatherL from "../Images/WeatherImages/WeatherL.png";
import WeatherM from "../Images/WeatherImages/WeatherM.png";
import WeatherN from "../Images/WeatherImages/WeatherN.png";
import WeatherO from "../Images/WeatherImages/WeatherO.png";
import WeatherP from "../Images/WeatherImages/WeatherP.png";
import WeatherQ from "../Images/WeatherImages/WeatherQ.png";
import WeatherR from "../Images/WeatherImages/WeatherR.png";
import WeatherS from "../Images/WeatherImages/WeatherS.png";
import WeatherT from "../Images/WeatherImages/WeatherT.png";

class Map extends Component {
  static contextType = UserContext;

  state = {};

  onFinishPeriod = (e) => {
    console.log("submit");
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
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="map" onFinishPeriod={this.onFinishPeriod} />
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
                    Map
                  </Box>
                </Grid>
              </Grid>
              <div class="map">
                <img src={MapImage} alt="" />
                <div id="pin-A" class="mapMarker">
                  <h3>A</h3>
                  <div class="pin-text">
                    <img src={WeatherA} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-B" class="mapMarker">
                  <h3>B</h3>
                  <div class="pin-text">
                    <img src={WeatherB} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-C" class="mapMarker">
                  <h3>C</h3>
                  <div class="pin-text">
                    <img src={WeatherC} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-D" class="mapMarker">
                  <h3>D</h3>
                  <div class="pin-text">
                    <img src={WeatherD} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-E" class="mapMarker">
                  <h3>E</h3>
                  <div class="pin-text">
                    <img src={WeatherE} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-F" class="mapMarker">
                  <h3>F</h3>
                  <div class="pin-text">
                    <img src={WeatherF} class="weatherImage" />
                  </div>
                </div>{" "}
                <div id="pin-G" class="mapMarker">
                  <h3>G</h3>
                  <div class="pin-text">
                    <img src={WeatherG} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-H" class="mapMarker">
                  <h3>H</h3>
                  <div class="pin-text">
                    <img src={WeatherH} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-I" class="mapMarker">
                  <h3>I</h3>
                  <div class="pin-text">
                    <img src={WeatherI} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-J" class="mapMarker">
                  <h3>J</h3>
                  <div class="pin-text">
                    <img src={WeatherJ} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-K" class="mapMarker">
                  <h3>K</h3>
                  <div class="pin-text">
                    <img src={WeatherK} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-L" class="mapMarker">
                  <h3>L</h3>
                  <div class="pin-text">
                    <img src={WeatherL} class="weatherImage" />
                  </div>
                </div>{" "}
                <div id="pin-M" class="mapMarker">
                  <h3>M</h3>
                  <div class="pin-text">
                    <img src={WeatherM} class="weatherImage" />
                  </div>
                </div>{" "}
                <div id="pin-N" class="mapMarker">
                  <h3>N</h3>
                  <div class="pin-text">
                    <img src={WeatherN} class="weatherImage" />
                  </div>
                </div>{" "}
                <div id="pin-O" class="mapMarker">
                  <h3>O</h3>
                  <div class="pin-text">
                    <img src={WeatherO} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-P" class="mapMarker">
                  <h3>P</h3>
                  <div class="pin-text">
                    <img src={WeatherP} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-Q" class="mapMarker">
                  <h3>Q</h3>
                  <div class="pin-text">
                    <img src={WeatherQ} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-R" class="mapMarker">
                  <h3>R</h3>
                  <div class="pin-text">
                    <img src={WeatherR} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-S" class="mapMarker">
                  <h3>S</h3>
                  <div class="pin-text">
                    <img src={WeatherS} class="weatherImage" />
                  </div>
                </div>
                <div id="pin-T" class="mapMarker">
                  <h3>T</h3>
                  <div class="pin-text">
                    <img src={WeatherT} class="weatherImage" />
                  </div>
                </div>
              </div>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Map;
