import React from "react";

import { Switch, Route } from "react-router-dom";
import LoginPage from "../components/Login";

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/login/" component={LoginPage}></Route>
    </Switch>
  );
}

export default AppRoutes;
