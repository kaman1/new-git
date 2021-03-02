import React from "react";
import { Marker } from "react-map-gl";
import DirectionsBoatTwoToneIcon from "@material-ui/icons/DirectionsBoatTwoTone";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import styled from "styled-components";

function Pins(props) {
  const { data, onClick } = props;

  return data.map((coords, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={coords.longitude}
      latitude={coords.latitude}
    >
      <Container onClick={() => onClick(coords)}>
        <RoomTwoToneIcon style={{ width: 20, height: 20, color: "#00296b" }} />
        <DirectionsBoatTwoToneIcon
          style={{ width: 20, height: 20, color: "#00296b" }}
        />
      </Container>
    </Marker>
  ));
}

export default Pins;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  background-color: #00cb8d;
  border-radius: 50px;
  &:hover {
    background-color: orange;
  }
`;
