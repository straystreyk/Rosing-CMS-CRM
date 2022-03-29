import { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { Configuration } from "../Configuration";
import { RouteWithoutLayout } from "react-admin";
import { Layouts } from "../../components/Layout";

export const getRoutes: (token: string | null) => ReactElement[] = (token) => {
  if (token) {
    return [
      <Route exact path="/configuration" render={() => <Configuration />} />,
      <Redirect exact from="/media_content" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/video" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/radio" to="/media_content/radio/radio_stations" />,
    ];
  }

  return [
    <RouteWithoutLayout exact path="/login/reset" render={() => <Layouts.Login isResetPage />} />,
  ];
};
