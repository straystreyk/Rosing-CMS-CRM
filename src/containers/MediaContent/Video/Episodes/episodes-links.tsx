import { GET_ONE_SEASON_NAME } from "../Seasons/requests";
import { GET_ONE_EPISODE_NAME } from "./requests";

export const episodesLinks = [
  {
    name: "Episodes",
    href: "/media_content/video/seasons/:seasonId/episodes",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "seasonId",
  },
  {
    name: "New episode",
    href: "/media_content/video/seasons/:seasonId/episodes/create",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "seasonId",
  },
  {
    name: "",
    href: "/media_content/video/seasons/:seasonId/episodes/:id",
    query: GET_ONE_EPISODE_NAME,
    secondDynamicParam: "seasonId",
    dynamicParam: "id",
  },
];
