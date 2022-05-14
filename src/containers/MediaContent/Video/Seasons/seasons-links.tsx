import { GET_ONE_SERIES_NAME } from "../Series/requests";
import { GET_ONE_SEASON_NAME } from "./requests";

export const seasonsLinks = [
  {
    name: "Seasons",
    href: "/media_content/video/series/:seriesId/seasons",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "seriesId",
  },
  {
    name: "Seasons",
    href: "/media_content/video/seasons",
    alternativeHref: "/media_content/video/series/:seriesId/seasons",
    alternativeParam: "series",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "seasonId",
    secondDynamicParam: "seriesId",
  },
  {
    name: "New season",
    href: "/media_content/video/series/:seriesId/seasons/create",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "seriesId",
  },
  {
    name: "",
    href: "/media_content/video/series/:seriesId/seasons/:id",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "id",
    secondDynamicParam: "seriesId",
  },

  {
    name: "",
    href: "/media_content/video/seasons/:seasonId",
    alternativeHref: "/media_content/video/series/:seriesId/seasons/:seasonId",
    alternativeParam: "series",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "seasonId",
    secondDynamicParam: "seriesId",
    breadcrumbName: "name",
  },
];
