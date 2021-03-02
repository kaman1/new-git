import React from "react";
import { useState } from "react";
import "./map.css";
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  Popup,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import Pins from "./Pin";
import CoordsInfo from "./CoordsInfo";

import { API } from "aws-amplify";
import { listPosts } from "../../../graphql/queries";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const fullscreenControlStyle = {
  right: 10,
  top: 10,
};

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
  right: 10,
  top: 50,
};

function MapMobile() {
  const [post, setPost] = React.useState([]);

  //remove me please after debug
  console.log(post);

  React.useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      const _Posts = await API.graphql({
        query: listPosts,
        variables: {},
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

  const [popupInfo, setPopupInfo] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 15.491612,
    longitude: 119.789056,
    zoom: 5.9,
  });

  return (
    <ReactMapGL
      width="100vw"
      height="100vh"
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Pins data={post} onClick={setPopupInfo} />

      {popupInfo && (
        <>
          <Popup
            tipSize={20}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <CoordsInfo info={popupInfo} />
          </Popup>
        </>
      )}
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navControlStyle} />
      <ScaleControl style={scaleControlStyle} />
      <GeolocateControl style={geolocateStyle} />
    </ReactMapGL>
  );
}

export default MapMobile;
