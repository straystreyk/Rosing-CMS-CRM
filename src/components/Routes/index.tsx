import { Route, Redirect } from "react-router-dom";
import { RouteWithoutLayout } from "react-admin";
import { Configuration } from "../../containers/Configuration";
import { Layouts } from "../Layout";
import { Create } from "../../containers/Seasons/seasons";

const authCustomRoutes = [
  <Route exact path="/configuration" render={() => <Configuration />} />,
  <Route
    exact
    path="/media_content/video/series/:id/seasons/create"
    render={(props) => (
      <Create
        basePath={`/media_content/video/series/${props.match.params.id?.replace(
          /%3D/g,
          "="
        )}/seasons`}
      />
    )}
  />,
  <Redirect exact from="/media_content" to="/media_content/video/movies" />,
  <Redirect exact from="/media_content/video" to="/media_content/video/movies" />,
  <Redirect exact from="/media_content/radio" to="/media_content/radio/radio_stations" />,
];

let customRoutes = [
  <RouteWithoutLayout exact path="/login/reset" render={() => <Layouts.Login isResetPage />} />,
];

if (localStorage.getItem("token")) {
  customRoutes = authCustomRoutes;
}

export default customRoutes;
