import React from "react";
import { Route, Switch } from "react-router-dom";
import { Game } from "../components";

export const GameRoutes = () => {
  return (
    <Switch>
      <Route exact path="/game" component={Game} />
    </Switch>
  );
};
