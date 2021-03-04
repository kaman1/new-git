import React from "react";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Container, Box, Stack, Card } from "@rent_avail/layout";
import { Text, Heading } from "@rent_avail/typography";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../navbar/responsive";
import './how.css'

function How() {
  const visible = useMediaQuery({ maxWidth: DeviceSize.mobile });

  return (
    <ThemeProvider theme={theme}>
      <Base />
      <Box className="bg-image">
        <Container as={Stack}>
          {visible ? (
            <HeadetTitle>
              <Title as="h4">How To Contribute?</Title>
            </HeadetTitle>
          ) : (
            <HeadetTitle>
              <Title as="h3">How To Contribute?</Title>
            </HeadetTitle>
          )}

          <DescCard my="1rem" bg="blue_100" p="4rem">
            Over The Horizon asks users to capture photographs of ships suspected of
            engaging in illegal, unreported, and unregulated (IUU) fishing
            activities and to note their own location and the time when the
            photo was captured. Users are also asked to take note of the
            observed ship’s general direction of travel (bearing), as well as
            its range (in nautical miles) and direction (degrees) from their own
            ship’s location. <br />
            <br /> If available, users are asked to supply supplemental
            information about the ship they have observed to include its name,
            IMO number (if visible), and any notes about the interaction. With
            this information, submitted reports can be plotted on a geospatially
            referenced map. Once information is inputted via the mobile
            application it will be presented on a map as part of an open-source
            web-based data repository which can be accessed free of charge by
            anyone. This process can be completed by users at sea, in the air,
            or on the land as long as they are within visual range of a vessel
            suspected of conducting IUU fishing activities.
            <br />
            <br />
            The qualitative data and media submitted to Over The Horizon might be useful
            to several key groups, including academics and researchers,
            conservationists and activists, the media, concerned citizens, as
            well as government enforcement entities. Over The Horizon expects that
            community-submitted information will lead to increased transparency
            of at sea events, more effective maritime law enforcement, greater
            livelihood security for fishermen, and safer seas.
            {"\n"}
            {"\n"}
          </DescCard>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default How;

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
