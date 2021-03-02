import React from "react";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Container, Box, Stack, Card } from "@rent_avail/layout";
import { Text, Heading } from "@rent_avail/typography";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../navbar/responsive";
import "./impact.css"

function Impact() {
  const visible = useMediaQuery({ maxWidth: DeviceSize.mobile });

  return (
    <ThemeProvider theme={theme}>
      <Base />
      <Box className="bg-image-impact">
        <Container as={Stack}>
          {visible ? (
            <HeadetTitle>
              <Title as="h4">About MANEWA</Title>
            </HeadetTitle>
          ) : (
            <HeadetTitle>
              <Title as="h3">About MANEWA</Title>
            </HeadetTitle>
          )}

          <DescCard my="1rem" bg="blue_100" p="4rem">
            Our oceans are a provider of vital natural resources and personal
            livelihoods, and serve as a global highway for commerce. Even with
            advanced surveillance equipment including spaced-based satellites
            and unmanned aircraft, vessel movements, activities, and
            interactions occurring between ships at sea remain difficult to
            discern.
            <br />
            <br /> This lack of general awareness and oversight has created an
            opportunity for increased exploitation and competition across vast
            largely unsecured areas. A range of entities are increasingly
            conducting illegal activities at sea to include incursions into
            sovereign countries’ maritime territory, illegal, unreported, and
            unregulated (IUU) fishing within other countries’ Exclusive Economic
            Zones, and dangerous maneuvers involving multiple ships.
            <br />
            <br />
            MANEWA, short for “maritime neighborhood watch”, is designed to
            increase transparency of events occurring at sea. Through a process
            known as participatory mapping, it is possible for law-abiding
            individuals to coordinate the detection, identification, and
            tracking of malign activities. MANEWA facilitates this process
            through a community-based data collection application that leverages
            users’ existing technology (smartphones with cameras and GPS) in
            order to crowdsource information about events occurring at sea. This
            data can then broadcast worldwide for free via the internet in order
            to increase awareness, conduct academic research, and aid government
            enforcement operations which ultimately protect local livelihoods
            and territorial sovereignty within participating countries.
            {"\n"}
            {"\n"}
          </DescCard>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Impact;

const HeadetTitle = styled(Card)`
  background-color: #00cb8d;
  color: #fff;
  box-shadow: 4px 4px 15px rgba(5, 13, 87, 0.135);
  margin-top: 50px;
`;
const Title = styled(Heading)`
  font-weight: bold;
`;

const DescCard = styled(Card)`
  color: #00296b;
  box-shadow: 4px 4px 15px rgba(5, 13, 87, 0.094);
`;
