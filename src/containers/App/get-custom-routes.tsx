import { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { Configuration } from "../Configuration";
import { RouteWithoutLayout } from "react-admin";
import { Layouts } from "../../components/Layout";

export const getRoutes: (token: string | null) => ReactElement[] = (token) => {
  if (token) {
    return [
      <Route exact path="/configuration" render={() => <Configuration />} />,
      <Redirect
        exact
        from="/pages_and_attributes"
        to="/pages_and_attributes/filters/search_filters_groups"
      />,
      <Redirect
        exact
        from="/pages_and_attributes/filters"
        to="/pages_and_attributes/filters/search_filters_groups"
      />,
      <Redirect exact from="/media_content" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/video" to="/media_content/video/movies" />,
      <Redirect exact from="/media_content/radio" to="/media_content/radio/radio_stations" />,
      <Redirect exact from="/media_content/audio" to="/media_content/audio/audio_shows" />,
      <Redirect
        exact
        from="/media_content/attributes"
        to="/media_content/attributes/providers/content_providers"
      />,
      <Redirect
        exact
        from="/media_content/attributes/providers"
        to="/media_content/attributes/providers/content_providers"
      />,
      <Redirect exact from="/media_content/tv" to="/media_content/tv/channels/channels" />,
      <Redirect exact from="/media_content/tv/channels" to="/media_content/tv/channels/channels" />,
      <Redirect
        exact
        from="/media_content/tv/tv_shows"
        to="/media_content/tv/tv_shows/epg_sources"
      />,
    ];
  }

  return [
    <RouteWithoutLayout exact path="/login/reset" render={() => <Layouts.Login isResetPage />} />,
  ];
};
