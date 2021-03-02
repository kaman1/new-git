import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Accessibility(props) {
  return (
    <AccessibilityContainer>
      <Link to="form" onClick={props.setOpen}>
        <LoginButton>Submit Report</LoginButton>
      </Link>
    </AccessibilityContainer>
  );
}

export default Accessibility;

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 25px;
`;
const LoginButton = styled.button`
  border: 0;
  outline: 0;
  font-size: 12px;
  padding: 10px 3em;
  color: #ffffff;
  font-weight: 600;
  border-radius: 1px;
  background-color: #00cb8d;
  border: 1px solid #00c9ff;
  margin-right: 10px;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #00c9ff;
  }
  &:not(:last-child) {
    margin-right: 7px;
  }
`;
