import React from "react";
import styled from "styled-components";

const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border: 1px solid gray;
  margin-bottom: 16px !important;
  margin-top: 8px !important;
  width: 90%;
  max-width: 320px;
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

class OpenData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    fetch("/chain/", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <>
        {this.state.data ? (
          <UL>
            {this.state.data.map((obj, index) => (
              <Li key={index + 1}>
                <HeadingBlock>
                  Block {index + 1}
                  <FloatRight>
                    {new Date(obj.transaction.timestamp).toDateString()}
                  </FloatRight>
                </HeadingBlock>
                <InfoBlock key={"doctor" + index}>
                  <Label>Doctor:</Label> {obj.transaction.doctor}
                </InfoBlock>
                <InfoBlock key={"patient" + index}>
                  <Label>Patient:</Label> {obj.transaction.patient}
                </InfoBlock>
                <InfoBlock key={"details" + index}>
                  <Label>Details:</Label> {obj.transaction.details}
                </InfoBlock>
              </Li>
            ))}
          </UL>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default OpenData;
