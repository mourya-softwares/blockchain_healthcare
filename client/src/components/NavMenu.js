import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.ul`
  position: absolute;
  z-index: 1;
  top: 45px;
  right: 0px;
  width: 75%;
  min-width: 240px;
  background-color: white;
  list-style: none;
  margin: 0;
  line-height: 1.5;
  padding: 16px 0;
`;

const NavItems = styled.li`
  text-align: center;
  padding: 12px 0px;
  letter-spacing: 2px;
`;

function NavMenu() {
  return (
    <NavContainer>
      <NavItems>Home</NavItems>
      <NavItems>
        <Link to="/login/">Login</Link>
      </NavItems>
      <NavItems>Data</NavItems>
      <NavItems>Contact Us</NavItems>
    </NavContainer>
  );
}

export default NavMenu;
