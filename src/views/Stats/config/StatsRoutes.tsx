import React from "react";
import { Route, Switch } from "react-router-dom";
import { Stats } from "../components";

export const StatsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/stats" component={Stats} />
    </Switch>
  );
};
