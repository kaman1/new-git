import React from "react";
import styled from "styled-components";
import Accessibility from "./Accessibility";
import { MenuToggle } from "./MenuToggle";
import { Link } from "react-router-dom";

export default function MobileNavLink(props) {
  const [isOpen, setOpen] = React.useState(false);

  const refreshPage = async () => {
    await window.location.reload();
  };

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <LinkTo to="/maps" onClick={() => setOpen(!isOpen)}>
              Map
            </LinkTo>
          </LinkItem>
          <LinkItem>
            <LinkTo to="/explore" onClick={() => setOpen(!isOpen)}>
              Observation Data
            </LinkTo>
          </LinkItem>
          {/* <LinkItem>
            <LinkTo to="/form">Submit Report</LinkTo>
          </LinkItem> */}
          <LinkItem>
            <LinkTo to="/how" onClick={() => setOpen(!isOpen)}>
              How it works
            </LinkTo>
          </LinkItem>
          <LinkItem>
            <LinkTo to="/impact" onClick={() => setOpen(!isOpen)}>
              Impact
            </LinkTo>
          </LinkItem>
          <Accessibility setOpen={() => setOpen(!isOpen)} />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  z-index: 2;
  margin-top: 15px;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 50%;
  flex-direction: column;
  position: fixed;
  top: 35px;
  left: 0;
  background-color: #00296b;
`;

const LinkItem = styled.li`
  margin-top: 10px;
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;

  &:hover {
    border: 2px solid #00cb8d;
    background-color: #00cb8d;
  }
  margin-bottom: 10px;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  margin: 10px;
  color: #fff;
  width: 100%;
`;

const Margin = styled.div`
  height: 2em;
`;
