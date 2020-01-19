import React from "react";
import styled from "styled-components";

const UserInfo = styled.div`
  padding: 16px;
`;

const UserDetailContainer = styled.div`
  display: inline-block;
  padding: 16px 20px;
  vertical-align: top;
`;

const Image = styled.img`
  display: inline-block;
  height: 140px;
  width: 105px;
`;

const DividerLargeBlock = styled.div`
  display: inline-block;
  width: 10vw;
  height: 24px;
  background-color: lightgrey;
  vertical-align: middle;
  border-radius: 10px;
`;
const DividerSmallBlock = styled.div`
  display: inline-block;
  width: 10vw;
  height: 20px;
  background-color: grey;
  vertical-align: middle;
  border-radius: 10px;
`;

let Divider = function() {
  let divider = [];
  for (let indx = 0; indx < 5; indx++) {
    divider.push(<DividerLargeBlock key={"large" + indx} />);
    divider.push(<DividerSmallBlock key={"small" + indx} />);
  }
  return divider;
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.loginDetails = JSON.parse(localStorage.getItem("userInfo"));
  }
  UNSAFE_componentWillMount() {
    if (!this.loginDetails) {
      window.location.href = "/login/";
    }
  }
  render() {
    return (
      <>
        <UserInfo key="userInfo">
          <Image />
          <UserDetailContainer key="userdetail">
            {this.loginDetails.name}
          </UserDetailContainer>
        </UserInfo>
        <Divider key="divider" />
      </>
    );
  }
}

export default Dashboard;
