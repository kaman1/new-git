import React from "react";
import styled from "styled-components";
import DirectionsBoatOutlinedIcon from "@material-ui/icons/DirectionsBoatOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NearMeIcon from "@material-ui/icons/NearMe";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import {  Hash } from "react-feather";

function CoordsInfoTest(props, onClick) {
  const { info } = props;
  const image = info.image;

  return (
    <>
      <Container >
        <ImageWrapper>
          <Img src={image} />
        </ImageWrapper>
        <SpanDesc>
          <Icon>
            <DirectionsBoatOutlinedIcon />
          </Icon>
          <Title> Ship: {info.shipname}</Title>
        </SpanDesc>

        <SpanDesc>
          <Icon>
            <LocationOnIcon />
          </Icon>
          <Title>Lat: {info.latitude}</Title>
        </SpanDesc>
        <SpanDesc>
          <Icon>
            <LocationOnIcon />
          </Icon>
          <Title>Lon: {info.longitude}</Title>
        </SpanDesc>
        <SpanDesc>
          <Icon>
            <Hash />
          </Icon>
          <Title>IMO: {info.imonumber}</Title>
        </SpanDesc>
        <SpanDesc>
          <Icon>
            <LinearScaleIcon />
          </Icon>
          <Title>NM: {info.nauticalmile}</Title>
        </SpanDesc>
        <SpanDesc>
          <Icon>
            <NearMeIcon />
          </Icon>
          <Title>Bearing {info.bearing}</Title>
        </SpanDesc>
        <SpanDesc>
          <Icon>
            <ExploreIcon />
          </Icon>
          <Title>Deg: {info.degree}&deg;</Title>
        </SpanDesc>
        <Btn>
          {image ? (
            <ImageLink target="_new" href={info.image}>
              IMAGE LINK
            </ImageLink>
          ) : (
            <Alert>No image</Alert>
          )}
        </Btn>
      </Container>
    </>
  );
}

export default CoordsInfoTest;

const Alert = styled.p`
  background-color: red;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
`;
const Title = styled.div`
  margin-left: 10px;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00296b;
  background-color: orange;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const SpanDesc = styled.div`
  font-size: 17px;
  font-weight: bold;
  background-color: #141f2e;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  padding-left: 20px;
  margin: 5px;
`;
const ImageWrapper = styled.div`
  background-color: #141f2e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 5px;
`;
const Btn = styled.div`
  font-size: 17px;
  font-weight: bold;
  background-color: #141f2e;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
`;

const ImageLink = styled.a`
  background-color: #009266;
  color: #fff;
  padding: 17px;
  position: relative;
  width: 100%;
  text-decoration: none;
  border-radius: 2px;
  font-weight: bold;
  text-align: center;
  &:hover {
    background-color: orange;
    color: #00296b;
    font-weight: bold;
  }
`;

const Img = styled.img`
  height: 200px;
  width: auto;
  background-size: cover;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  margin-top: 100px;
  z-index: 1;
  background-color: #23303e;
  width: 300px;
  height: auto;
`;
