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
`;

class NavMenu extends React.Component {
  constructor() {
    super();
    this.loginDetails = null;
  }
  UNSAFE_componentWillMount() {
    this.loginDetails = localStorage.getItem("userInfo");
  }
  handleLogout = () => {
    this.props.toggleMenu();
    localStorage.removeItem("userInfo");
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
            <NavItems key="3" onClick={this.handleLogout}>
              Logout
            </NavItems>
          </>
        )}

        <NavItems key="4">
          <a href="/data/" onClick={this.handleClick}>
            Data
          </a>
        </NavItems>
        <NavItems key="5" onClick={this.handleClick}>
          Contact Us
        </NavItems>
      </NavContainer>
    );
  }
}

export default NavMenu;
