import React from "react";

import styled from "styled-components";

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid red;
  font-size: 15px;
`;

const Container = styled.div`
  padding: 16px;
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border: 1px solid gray;
  margin-bottom: 16px !important;
  margin-top: 8px !important;
  margin: 0 auto;
`;

const HeadingBlock = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding: 12px 20px;
  background-color: salmon;
`;

const FloatRight = styled.div`
  font-size: 16px;
  float: right;
  color: antiquewhite;
`;

const InfoBlock = styled.div`
  padding: 12px;
  background: aliceblue;
  border-bottom: 1px solid gainsboro;
`;

const Label = styled.label`
  font-style: oblique;
  font-weight: 500;
`;

class PatientHistory extends React.Component {
  constructor() {
    super();
    this.state = { history: [], patients: [], selectedPatient: "-1" };
    this.loginDetails = JSON.parse(sessionStorage.getItem("userInfo"));
    this.inputRef = React.createRef();
  }
  UNSAFE_componentWillMount() {
    if (!this.loginDetails) {
      window.location.href = "/login/";
    }
  }
  componentDidMount() {
    let self = this;
    fetch("/usersByRole/?role=2")
      .then(res => res.json())
      .then(response => {
        console.log(response);
        self.setState({ patients: response.users });
      });
  }
  handleChange = event => {
    this.setState({ selectedPatient: event.target.value });
    let self = this;
    fetch("/patientHistory/?patient=" + event.target.value)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.success == true && response.data) {
          let history = response.data.map(obj => {
            return {
              doctor: obj.transaction.doctor || "",
              patient: obj.transaction.patient || "",
              details: obj.transaction.details || "",
              timestamp: new Date(obj.transaction.timestamp).toDateString()
            };
          });
          console.log(history);
          self.setState({ history: history });
        }
      });
  };
  render() {
    return (
      <Container>
        <h2>Hello {this.loginDetails.name}</h2>
        <p>Please select the patient to proceed.</p>
        <Select onChange={this.handleChange} defaultValue="-1">
          <option value="-1">Select Patient</option>
          {this.state.patients.map(obj => (
            <option value={obj.username} key={obj.name}>
              {obj.name}
            </option>
          ))}
        </Select>
        <UL>
          {this.state.history.map((transaction, index) => (
            <Li key={index + 1}>
              <HeadingBlock>
                Block {index + 1}
                <FloatRight>
                  {new Date(transaction.timestamp).toDateString()}
                </FloatRight>
              </HeadingBlock>
              <InfoBlock key={"doctor" + index}>
                <Label>Doctor:</Label> {transaction.doctor}
              </InfoBlock>
              <InfoBlock key={"patient" + index}>
                <Label>Patient:</Label> {transaction.patient}
              </InfoBlock>
              <InfoBlock key={"details" + index}>
                <Label>Details:</Label> {transaction.details}
              </InfoBlock>
            </Li>
          ))}
        </UL>
      </Container>
    );
  }
}

export default PatientHistory;
