import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteWithoutLayout } from "react-admin";

import { Configuration } from "../../containers/Configuration";
import { DetailSeason } from "../../containers/Seasons/detail-season";
import { DetailSeries } from "../../containers/Series/detail-series";
import { Layouts } from "../Layout";

const authCustomRoutes = [
  <Route exact path="/configuration" render={() => <Configuration />} />,
  <Route exact path="/seasons/:id/show" render={(props) => <DetailSeason {...props} />} />,
  <Route exact path="/series/:id/show" render={(props) => <DetailSeries {...props} />} />,
  <Route exact path="/episodes/:id/show" render={(props) => <div>{props.match.params.id}</div>} />,
  <Redirect exact from="/media_content" to="/media_content/movies" />,
];

let customRoutes = [
  <RouteWithoutLayout exact path="/login/reset" render={() => <Layouts.Reset />} />,
];

if (localStorage.getItem("token")) {
  customRoutes = authCustomRoutes;
}

export default customRoutes;
