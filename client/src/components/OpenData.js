import React from "react";

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
          <ul>
            {this.state.data.map((obj, index) => (
              <li key={index + 1}>
                <div key={"doctor" + index}>
                  Doctor: {obj.transaction.doctor}
                </div>
                <div key={"patient" + index}>
                  Patient: {obj.transaction.patient}
                </div>
                <div key={"details" + index}>
                  Details: {obj.transaction.details}
                </div>
                <div key={"time" + index}>
                  {new Date(obj.transaction.timestamp).toDateString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default OpenData;
