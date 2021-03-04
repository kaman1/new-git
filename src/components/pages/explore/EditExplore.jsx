import React from "react";
import CardsUpdated from "./CardsUpdated";
import CardsMobile from "./CardsMobile";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "../../navbar/responsive";
import { ThemeProvider } from "styled-components";
import { Base, theme } from "@rent_avail/base";
import { Container, Stack, Card } from "@rent_avail/layout";
import { Heading } from "@rent_avail/typography";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function EditExplore() {
  const [currentUser, setUser] = React.useState([]);

  //please remove me
  console.log(currentUser);

  React.useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    let user = await Auth.currentAuthenticatedUser();
    setUser(user.username);
  }

  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Base />
        <Container as={Stack} style={{ marginTop: 40 }}>
          {!isMobile && (
            <CardTitle>
              <div>
                <div>
                  <Heading as="h3">Hello {currentUser}!</Heading>
                  <p>Edit and update your data</p>
                </div>
              </div>
              <AmplifySignOut />
            </CardTitle>
          )}
        </Container>

        <Container1>
          {isMobile && <MobileTitle>MY OBSERVATIONS</MobileTitle>}

          {!isMobile && (
            <>
              <CardsUpdated />
            </>
          )}
          {isMobile && (
            <>
              <CardsMobile />
            </>
          )}
        </Container1>
      </ThemeProvider>
    </>
  );
}

export default EditExplore;

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

const MobileTitle = styled(Card)`
  font-size: 22px;
  background-color: #00cb8d;
  color: #00296b;
  margin: 20px 1rem 9px;
`;
const CardTitle = styled(Card)`
  background-color: #00cb8d;
  color: #00296b;
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
