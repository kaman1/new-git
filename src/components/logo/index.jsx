import React from "react";
import styled from "styled-components";
import logow from "../../assets/images/logow.png";
import { Link } from "react-router-dom";

function Logo(props) {
  return (
    <LogoWrapper>
      <Link to="/">
        <LogoImg>
          <img src={logow} alt="Greeland logo" />
        </LogoImg>
      </Link>
    </LogoWrapper>
  );
}

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const LogoImg = styled.div`
  width: 200px;
  height: 30px;

  img {
    width: 100%;
    height: 100%;
  }
`;
