import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  text-align: center;
  padding: 0.75em;
  margin: 0.5em auto;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 16px;
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
`;

const TabButton = styled.div`
  padding: 10px 20px;
  text-align: center;
  border-bottom: ${props => (props.selected ? "1px solid black" : "none")};
`;

const LoginRegisterLabel = ["Login", "Register"];

function LoginPage() {
  let [Page, SetPage] = React.useState(0);
  const username = React.useRef(null);
  const password = React.useRef(null);
  let handleTabClick = page => {
    if (page != Page) SetPage(page);
  };

  let handleLoginRegister = () => {
    fetch("/login/", {
      method: "POST",
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      })
    }).then(res => console.log(res));
  };

  return (
    <>
      <Flex>
        <TabButton selected={Page == 0} onClick={() => handleTabClick(0)}>
          Login
        </TabButton>
        <span>|</span>
        <TabButton selected={Page == 1} onClick={() => handleTabClick(1)}>
          Register
        </TabButton>
      </Flex>
      <Input type="text" ref={username} placeholder="Enter username" />
      <Input type="text" ref={password} placeholder="Enter password" />
      <Button onClick={handleLoginRegister}>{LoginRegisterLabel[Page]}</Button>
    </>
  );
}

export default LoginPage;
