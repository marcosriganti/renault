import React from "react";
import { Route, Switch } from "react-router-dom";
import { Game, Level } from "../components";

export const GameRoutes = () => {
  return (
    <Switch>
      <Route exact path="/game" component={Game} />
      <Route exact path="/game/level/:levelId" component={Level} />
    </Switch>
  );
};
