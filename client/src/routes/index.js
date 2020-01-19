import React from "react";

import { Switch, Route } from "react-router-dom";
import LoginPage from "../components/Login";
import Dashboard from "../components/Dashboard";
import DoctorLoginPage from "../components/DoctorLogin";
import OpenData from "../components/OpenData";

function AppRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/doctor/login/"
        component={DoctorLoginPage}
        key="doctor-login"
      />
      <Route exact path="/login/" component={LoginPage} key="login" />
      <Route exact path="/dashboard/" component={Dashboard} key="dashboard" />
      <Route exact path="/data/" component={OpenData} key="data" />
    </Switch>
  );
}

export default AppRoutes;
