import React, { useState } from "react";
import "./map.css";
import ReactMapGL, {
  NavigationControl,
  Popup,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import Pins from "./Pin";
import CoordsInfo from "./CoordsInfo";

import { API } from "aws-amplify";
import { listPosts } from "../../../graphql/queries";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Text } from "@rent_avail/typography";
import {
  Dialog,
  DialogTarget,
  DialogHeader,
  ConfirmationDialog,
} from "@rent_avail/dialog";
import logo from "../../../assets/images/logo.png";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const fullscreenControlStyle = {
//   right: 10,
//   top: 10,
// };

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

const navControlStyle = {
  left: 10,
  bottom: 130,
};

function Maps() {
  const [post, setPost] = useState([]);
  const [open, set] = React.useState(false);
  function handleClick() {
    set((o) => !o);
  }

  React.useEffect(() => {
    Timer();
    TimerOff();
  }, []);

  function Timer() {
    setTimeout(() => {
      set(true);
    }, 2000);
  }

  async function TimerOff() {
    await setTimeout(() => {
      set(false);
    }, 60000);
  }

  //remove me please after debug
  console.log(post);

  React.useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const _Posts = await API.graphql({
        query: listPosts,
        authMode: "AWS_IAM",
      });
      setPost(_Posts.data.listPosts.items);
      console.log(
        `Executed query, data: ${JSON.stringify(_Posts.data.listPosts.items)}`
      );
    } catch (error) {
      console.log(`Error executing query: ${error}`);
    }
  }

  const [popupInfo, setPopupInfo] = useState(null);
  // const [on, toggle] = useToggle(true);
  const [viewport, setViewport] = useState({
    latitude: 12.607443,
    longitude: 116.232194,
    zoom: 5,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Base />
        <Dialog open={open} toggle={handleClick} id="confirmation-id">
          <DialogTarget>
            <button
              onClick={handleClick}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "transparent",
                position: "absolute",
              }}
            >
              Open Modal
            </button>
          </DialogTarget>
          <ConfirmationDialog style={{ marginTop: 100 }}>
            <DialogHeader title="Instructions" />
            <div style={{ marginBottom: 30 }}>
              <img src={logo} alt="logo" width="100" />
            </div>
            <Text>
              * Take a photo of a ship that you suspect to be conducting illegal
              activity.
              <br />
              <br />
              * Take note of the observed ship’s general direction of travel
              (bearing), as well as its range from your current location (in
              nautical miles) and direction (in degrees) from your ship.
              <br />
              <br />
              * Take note of your ship’s position (latitude and longitude) and
              the time.
              <br />
              <br />
              * Upload your photo and fill in any additional information you
              have recorded including the observed ship’s name and IMO number
              (if available).
              <br />
              <br />* Submit your report and stay vigilant!
            </Text>
          </ConfirmationDialog>
        </Dialog>
      </ThemeProvider>

      <ReactMapGL
        width="100vw"
        height="100vh"
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle={"mapbox://styles/mapbox/basic-v9"}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Pins data={post} onClick={setPopupInfo} />

        {popupInfo && (
          <>
            <Popup
              tipSize={0}
              anchor="left"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              <CoordsInfo info={popupInfo} />
            </Popup>
          </>
        )}
        {/* <FullscreenControl style={fullscreenControlStyle} /> */}
        <NavigationControl style={navControlStyle} />
        <ScaleControl style={scaleControlStyle} />
        <GeolocateControl style={geolocateStyle} />
      </ReactMapGL>
    </>
  );
}

export default Maps;