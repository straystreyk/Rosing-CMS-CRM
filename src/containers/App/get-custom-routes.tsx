import { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { Configuration } from "../Configuration";
import { sanytizeId } from "../../helpers/form";
import {
  Create as CreateSeasons,
  List as SeasonsList,
  Edit as EditSeasons,
  resource as SeasonResource,
} from "../Seasons/seasons";
import { RouteWithoutLayout } from "react-admin";
import { Layouts } from "../../components/Layout";

export const getRoutes: (token: string | null) => ReactElement[] = (token) => {
  if (token) {
    return [
      <Route exact path="/configuration" render={() => <Configuration />} />,
      <Route
        exact
        path="/media_content/video/series/:id/seasons"
        render={(props) => (
          <SeasonsList
            {...props}
            resource={SeasonResource}
            id={sanytizeId(props.match.params.id)}
            basePath={`/media_content/video/series/${sanytizeId(props.match.params.id)}/seasons`}
          />
        )}
      />,
      <Route
        exact
        path="/media_content/video/series/:id/seasons/create"
        render={(props) => (
          <CreateSeasons
            basePath={`/media_content/video/series/${sanytizeId(props.match.params.id)}/seasons`}
          />
        )}
      />,
      <Route
        exact
        path="/media_content/video/series/:seriesId/seasons/:id"
        render={(props) => {
          return (
            <EditSeasons
              basePath={`/media_content/video/series/${sanytizeId(
                props.match.params.seriesId
              )}/seasons/${sanytizeId(props.match.params.id)}`}
              id={sanytizeId(props.match.params.id)}
            />
          );
        }}
      />,
      <Redirect exact from="/media_content" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/video" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/radio" to="/media_content/radio/radio_stations" />,
    ];
  }

  return [
    <RouteWithoutLayout exact path="/login/reset" render={() => <Layouts.Login isResetPage />} />,
  ];
};
