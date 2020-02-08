import React from "react";

import { Switch, Route } from "react-router-dom";
import LoginPage from "../components/Login";
import Dashboard from "../components/Dashboard";
import DoctorLoginPage from "../components/DoctorLogin";
import OpenData from "../components/OpenData";
import Prescription from "../components/Prescription";
import PatientHistory from "../components/PatientHistory";

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
      <Route
        exact
        path="/prescription/"
        component={Prescription}
        key="prescripe"
      />
      <Route exact path="/history/" component={PatientHistory} key="history" />
      <Route exact path="/dashboard/" component={Dashboard} key="dashboard" />
      <Route exact path="/data/" component={OpenData} key="data" />
    </Switch>
  );
}

export default AppRoutes;
