import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  overflow: auto;
  padding: 6px 12px;
  box-shadow: 0px 2px 4px grey;
`;

const BrandName = styled.div`
  float: left;
  font-size: 20px;
  margin-top: 4px;
`;
const HamBurgerWrapper = styled.div`
  float: right;
`;

const HamBurgerChild = styled.div`
  margin: 5px 0px;
  height: 6px;
  width: 32px;
  background-color: red;
`;

function HamBurgerIcon() {
  return (
    <HamBurgerWrapper>
      <HamBurgerChild></HamBurgerChild>
      <HamBurgerChild></HamBurgerChild>
      <HamBurgerChild></HamBurgerChild>
    </HamBurgerWrapper>
  );
}

class Header extends React.Component {
  render() {
    return (
      <>
        <HeaderContainer>
          <BrandName>BlockChain</BrandName>
          <HamBurgerIcon />
        </HeaderContainer>
        <h1>Header</h1>
      </>
    );
  }
}

export default Header;
