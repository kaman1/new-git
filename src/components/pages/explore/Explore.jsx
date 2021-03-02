import React from "react";
import Cards from "./Cards";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../navbar/responsive";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Card } from "@rent_avail/layout";
import { Heading } from "@rent_avail/typography";
import CardsDesktop from "./CardsDesktop";

function Explore() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Base />
        {!isMobile && (
          <HeaderTitle>
            <Heading as="h2">OBSERVATIONS</Heading>
          </HeaderTitle>
        )}
        {isMobile && <MobileTitle>OBSERVATIONS</MobileTitle>}

        <Container1>
          {!isMobile && (
            <>
              <Cards />
            </>
          )}
          {isMobile && (
            <>
              <CardsDesktop />
            </>
          )}
        </Container1>
      </ThemeProvider>
    </>
  );
}

export default Explore;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  height: auto;
  padding: 20px;
`;
const HeaderTitle = styled(Card)`
  font-size: 40px;
  background-color: #00cb8d;
  color: #00296b;
  margin: 50px 16rem 20px;
`;
const MobileTitle = styled(Card)`
  font-size: 22px;
  background-color: #00cb8d;
  color: #00296b;
  margin: 20px 1rem 9px;
`;
