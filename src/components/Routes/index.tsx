import { Route, Redirect } from "react-router-dom";
import { RouteWithoutLayout } from "react-admin";
import { Configuration } from "../../containers/Configuration";
import { Layouts } from "../Layout";
import {
  Create as CreateSeasons,
  List as SeasonsList,
  Edit as EditSeasons,
  resource as SeasonResource,
} from "../../containers/Seasons/seasons";

const authCustomRoutes = [
  <Route exact path="/configuration" render={() => <Configuration />} />,
  <Route
    exact
    path="/media_content/video/series/:id/seasons"
    render={(props) => (
      <SeasonsList
        {...props}
        resource={SeasonResource}
        id={unescape(props.match.params.id)}
        basePath={`/media_content/video/series/${unescape(props.match.params.id)}/seasons`}
      />
    )}
  />,
  <Route
    exact
    path="/media_content/video/series/:id/seasons/create"
    render={(props) => (
      <CreateSeasons
        basePath={`/media_content/video/series/${unescape(props.match.params.id)}/seasons`}
      />
    )}
  />,
  <Route
    exact
    path="/media_content/video/series/:seriesId/seasons/:id"
    render={(props) => {
      return (
        <EditSeasons
          basePath={`/media_content/video/series/${unescape(
            props.match.params.seriesId
          )}/seasons/${unescape(props.match.params.id)}`}
          id={unescape(props.match.params.id)}
        />
      );
    }}
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
