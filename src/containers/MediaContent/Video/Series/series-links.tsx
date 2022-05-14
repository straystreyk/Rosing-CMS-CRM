import { GET_ONE_SERIES_NAME } from "./requests";

export const seriesLinks = [
  {
    name: "Series",
    href: "/media_content/video/series",
  },
  {
    name: "New series",
    href: "/media_content/video/series/create",
  },
  {
    name: "",
    href: "/media_content/video/series/:id",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "id",
  },
  {
    name: "",
    href: "/media_content/video/series/:seriesId",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "seriesId",
  },
];
