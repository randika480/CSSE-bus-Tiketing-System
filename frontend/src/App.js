import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

//imported screens
import Home from "./screens/Home";
import Registration from "./screens/Registration";
import Support from "./screens/Support";
import AboutUs from "./screens/AboutUs";
import AdminLogin from "./screens/AdminLogin";
import PassengerProfile from "./screens/PassengerProfile";
import ManagerDashboard from "./screens/ManagerDashboard";
import InspectorDashboard from "./screens/InspectorDashboard";
import ConductorDashboard from "./screens/ConductorDashboard";

const App = () => {
  return (
    <BRouter>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/passenger" component={PassengerProfile} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Route exact path="/manager" component={ManagerDashboard} />
          <Route exact path="/conductor" component={ConductorDashboard} />
          <Route exact path="/inspector" component={InspectorDashboard} />
        </Switch>
      </main>
    </BRouter>
  );
};

export default App;
