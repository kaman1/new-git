import styled from "styled-components";
import Logo from "../logo";
import Accessibility from "./Accessibility";
import { NavLinks } from "./NavLinks";
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "./responsive";
import MobileNavLink from "./MobileNavLink";

export function NavBar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
    <NavBarContainer>
      <LeftSection>
        <Logo />
      </LeftSection>
      <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
      <RightSection>
        {isMobile && <MobileNavLink />}
      </RightSection>
    </NavBarContainer>
  );
}
const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 7px 8px rgba(15, 15, 15, 0.13);
  align-items: center;
  padding: 0 1.5em;
  display: flex;
  background-color: #00296b;
  padding: 10px;
`;

const LeftSection = styled.div`
  display: flex;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
`;
