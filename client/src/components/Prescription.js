import React from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  border: 1px solid red;
  width: 100%;
  margin-top: 20px;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid red;
  font-size: 15px;
`;

const Button = styled.button`
  display: block;
  background: white;
  color: palevioletred;
  font-size: 1em;
  margin: 1em auto;
  padding: 0.5em 1.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  font-size: 16px;
`;

const Container = styled.div`
  padding: 16px;
`;

class Prescription extends React.Component {
  constructor() {
    super();
    this.state = { patients: [], selectedPatient: "-1" };
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
  };
  handleSave = () => {
    fetch("/transaction/", {
      method: "POST",
      body: JSON.stringify({
        doctor: this.loginDetails.username,
        patient: this.state.selectedPatient,
        details: this.inputRef.current.value
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => alert(response));
  };
  render() {
    return (
      <Container>
        <h2>Hello {this.loginDetails.name}</h2>
        <p>Please select the patient to proceed.</p>
        <Select onChange={this.handleChange} defaultValue="-1">
          <option value="-1">Select Patient</option>
          {this.state.patients.map(obj => (
            <option value={obj.username}>{obj.name}</option>
          ))}
        </Select>
        {this.state.selectedPatient != -1 && (
          <>
            <TextArea
              ref={this.inputRef}
              placeholder="Please write the prescriptions here."
              rows="5"
            ></TextArea>
            <Button onClick={this.handleSave}>Save</Button>
          </>
        )}
      </Container>
    );
  }
}

export default Prescription;
