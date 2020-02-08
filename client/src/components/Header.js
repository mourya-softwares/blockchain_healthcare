import React from "react";
import styled from "styled-components";
import NavMenu from "./NavMenu";
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
  let [MenuState, SetMenuState] = React.useState(false);

  let toggleMenu = () => {
    SetMenuState(!MenuState);
  };

  return (
    <>
      <HamBurgerWrapper onClick={toggleMenu}>
        <HamBurgerChild key="1"></HamBurgerChild>
        <HamBurgerChild key="2"></HamBurgerChild>
        <HamBurgerChild key="3"></HamBurgerChild>
      </HamBurgerWrapper>
      {MenuState ? <NavMenu toggleMenu={toggleMenu} /> : null}
    </>
  );
}

class Header extends React.Component {
  render() {
    return (
      <>
        <HeaderContainer>
          <BrandName>HealthCare</BrandName>
          <HamBurgerIcon />
        </HeaderContainer>
      </>
    );
  }
}

export default Header;
