import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  padding: 0.75em;
  margin: 1em auto;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  &::placeholder {
    padding-left: ${props => (props.placeholderPL ? props.placeholderPL : "0")};
  }
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

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

const TabButton = styled.div`
  padding: 10px 20px;
  text-align: center;
  border-bottom: ${props => (props.selected ? "1px solid black" : "none")};
`;

const LoginRegisterLabel = ["Login", "Register"];

const apiRoute = {
  0: "/login/",
  1: "/register/"
};

function DoctorLoginPage() {
  let [Page, SetPage] = React.useState(0);
  const username = React.useRef(null);
  const password = React.useRef(null);
  const name = React.useRef(null);
  let handleTabClick = page => {
    if (page !== Page) SetPage(page);
  };

  let handleLoginRegister = () => {
    fetch(apiRoute[Page], {
      method: "POST",
      body: JSON.stringify({
        name: name.current ? `Dr. ${name.current.value}` : "",
        username: username.current.value,
        password: password.current.value,
        role: 1
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          if (Page === 1) {
            alert("Successfully registered! Please login to continue.");
            SetPage(0);
          } else {
            sessionStorage.setItem("userInfo", JSON.stringify(response));
            window.location.href = "/dashboard/";
          }
        } else {
          alert(response.message);
        }
      });
  };

  return (
    <>
      <Flex>
        <TabButton selected={Page === 0} onClick={() => handleTabClick(0)}>
          Login
        </TabButton>
        <span>|</span>
        <TabButton selected={Page === 1} onClick={() => handleTabClick(1)}>
          Register
        </TabButton>
      </Flex>
      {Page === 1 && <Input type="text" ref={name} placeholder="Enter name" />}
      <Input type="text" ref={username} placeholder="Enter username" />
      <Input type="text" ref={password} placeholder="Enter password" />
      <Button onClick={handleLoginRegister}>{LoginRegisterLabel[Page]}</Button>
    </>
  );
}

export default DoctorLoginPage;
