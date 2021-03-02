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

function MapsInst() {
  const [post, setPost] = useState([]);

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
  const [viewport, setViewport] = useState({
    latitude: 12.607443,
    longitude: 116.232194,
    zoom: 5,
  });

  return (
    <>
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
        <NavigationControl style={navControlStyle} />
        <ScaleControl style={scaleControlStyle} />
        <GeolocateControl style={geolocateStyle} />
      </ReactMapGL>
    </>
  );
}

export default MapsInst;
