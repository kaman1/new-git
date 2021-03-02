import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Accessibility from "./Accessibility";

export function NavLinks() {
  return (
    <>
      <NavLinksContainer>
        <LinksWrapper>
          <LinkItem>
            <LinkTo to="/maps">Map</LinkTo>
          </LinkItem>
          <LinkItem>
            <LinkTo to="/explore">Observation Data</LinkTo>
          </LinkItem>
          {/* <LinkItem>
            <LinkTo to="/form">Submit Report</LinkTo>
          </LinkItem> */}
          <LinkItem>
            <LinkTo to="/how">How it works</LinkTo>
          </LinkItem>
          <LinkItem>
            <LinkTo to="/impact">Impact</LinkTo>
          </LinkItem>
        </LinksWrapper>
      </NavLinksContainer>
      <Accessibility />
    </>
  );
}

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 209ms ease-in-out;

  &:hover {
    background-color: #2ecc71;
  }
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  margin: 10px;
  color: #fff;
`;
