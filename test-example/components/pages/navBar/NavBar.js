import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AmplifySignOut } from "@aws-amplify/ui-react";

function NavBar() {
  return (
    <NavLinksContainer>
      <LinksWrapper>
        <LinkItem>
          <LinkTo to="/">unAuth User</LinkTo>
        </LinkItem>
        <LinkItem>
          <LinkTo to="/form">Form</LinkTo>
        </LinkItem>
        <LinkItem>
          <LinkTo to="/auth-user">Auth User</LinkTo>
        </LinkItem>
        <AmplifySignOut />
      </LinksWrapper>
    </NavLinksContainer>
  );
}

export default NavBar;

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: palegreen;
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
  color: #000;
`;
