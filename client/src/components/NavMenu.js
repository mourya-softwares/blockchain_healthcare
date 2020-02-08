import React from "react";
import styled from "styled-components";

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
  > a {
    text-decoration: none;
    color: violet;
  }
`;

class NavMenu extends React.Component {
  constructor() {
    super();
    this.loginDetails = null;
  }
  UNSAFE_componentWillMount() {
    this.loginDetails = sessionStorage.getItem("userInfo");
  }
  handleLogout = () => {
    this.props.toggleMenu();
    sessionStorage.removeItem("userInfo");
    window.location.href = "/login/";
  };
  handleClick = event => {
    event.preventDefault();
    this.props.toggleMenu();
    window.location.href = event.currentTarget.href;
  };
  render() {
    return (
      <NavContainer>
        {!this.loginDetails ? (
          <NavItems key="2">
            <a href="/login/" onClick={this.handleClick}>
              Login
            </a>
          </NavItems>
        ) : (
          <>
            <NavItems key="2">
              <a href="/dashboard/" onClick={this.handleClick}>
                Dashboard
              </a>
            </NavItems>
            <NavItems key="3">
              <a href="/prescription/" onClick={this.handleClick}>
                Prescription
              </a>
            </NavItems>
            <NavItems key="4">
              <a href="/history/" onClick={this.handleClick}>
                Patient History
              </a>
            </NavItems>
            <NavItems key="5">
              <a href="/history/" onClick={this.handleLogout}>
                Logout
              </a>
            </NavItems>
          </>
        )}

        <NavItems key="6">
          <a href="/data/" onClick={this.handleClick}>
            Data
          </a>
        </NavItems>
        <NavItems key="7" onClick={this.handleClick}>
          Contact Us
        </NavItems>
      </NavContainer>
    );
  }
}

export default NavMenu;
