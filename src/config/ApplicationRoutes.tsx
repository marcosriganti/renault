import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthRoutes } from "../views/Auth";
import PrivateRoute from "../PrivateRoute";
import { StatsRoutes } from "../views/Stats";
import { DashboardRoutes } from "../views/Dashboard";
import { GameRoutes } from "../views/Game";
// import { Dashboard } from "../views/Dashboard/components";
const prefix = window.location.host === "lausina.org" ? "universo65" : "/";
const ApplicationRoutes = () => {
  return (
    <Router basename={prefix}>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={DashboardRoutes} />
        <PrivateRoute exact path="/game" component={GameRoutes} />
        <PrivateRoute
          exact
          path="/game/level/:levelId"
          component={GameRoutes}
        />
        <PrivateRoute exact path="/stats" component={StatsRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Redirect to="/auth" from="/" />
      </Switch>
    </Router>
  );
};

export default ApplicationRoutes;
