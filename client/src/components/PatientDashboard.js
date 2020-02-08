import React from "react";
import styled from "styled-components";

const UserInfo = styled.div`
  padding: 16px;
  background-color: aquamarine;
`;

const UserDetailContainer = styled.div`
  display: inline-block;
  padding: 16px 20px;
  vertical-align: middle;
`;

const ProfileImage = styled.img`
  display: inline-block;
  height: 140px;
  width: 105px;
  border-radius: 50%;
  vertical-align: middle;
`;

const PatientHistoryIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 8px;
`;

const Card = styled.a`
  width: 35vw;
  text-decoration: none;
  height: 26vh;
  border: 1px solid black;
  margin: 16px;
  float: ${props => (props.float ? props.float : "left")};
  padding: 8px;
  font-size: 20px;
  text-align: center;
`;

class PatientDashboard extends React.Component {
  constructor() {
    super();
    this.loginDetails = JSON.parse(sessionStorage.getItem("userInfo"));
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
          <ProfileImage src="/doctor.jpg" />
          <UserDetailContainer key="userdetail">
            {this.loginDetails.name}
          </UserDetailContainer>
        </UserInfo>
        <Card
          href="/history/"
          float="right"
          title="click here to check your medical history"
        >
          Check History <PatientHistoryIcon src="/history.png" />
        </Card>
      </>
    );
  }
}

export default PatientDashboard;
