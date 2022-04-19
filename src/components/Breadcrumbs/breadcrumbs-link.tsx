import { GET_ONE_MOVIE_NAME } from "../../containers/MediaContent/Movies/custom-requests";
import { DocumentNode } from "graphql";
import { GET_ONE_VIDEO_FILE } from "../../containers/MediaContent/VideoFiles/custom-requests";
import { GET_ONE_SERIES_NAME } from "../../containers/MediaContent/Series/requests";
import { GET_ONE_SEASON_NAME } from "../../containers/MediaContent/Seasons/requests";
import { GET_ONE_AUDIO_SHOW } from "../../containers/Audio/AudioShows/requests";

interface breadcrumbsLinkInterface {
  name: string;
  href: string;
  query?: DocumentNode;
  dynamicParam?: string;
  secondDynamicParam?: string;
}

export const breadcrumbsLinks: breadcrumbsLinkInterface[] = [
  {
    name: "Media content",
    href: "/media_content",
  },
  {
    name: "Video",
    href: "/media_content/video",
  },
  {
    name: "Audio",
    href: "/media_content/audio",
  },
  //Movie
  {
    name: "Movies",
    href: "/media_content/video/movies",
  },
  {
    name: "New movie",
    href: "/media_content/video/movies/create",
  },
  {
    name: "",
    href: "/media_content/video/movies/:id",
    query: GET_ONE_MOVIE_NAME,
    dynamicParam: "id",
  },
  //Audio show
  {
    name: "Audio shows",
    href: "/media_content/audio/audio_shows",
  },
  {
    name: "New audio show",
    href: "/media_content/audio/audio_shows/create",
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:id",
    dynamicParam: "id",
    query: GET_ONE_AUDIO_SHOW,
  },
  {
    name: "Radio",
    href: "/media_content/radio",
  },
  {
    name: "Radio stations",
    href: "/media_content/radio/radio_stations",
  },
  {
    name: "New radio station",
    href: "/media_content/radio/radio_stations/create",
  },
  {
    name: "Series",
    href: "/media_content/video/series",
  },
  {
    name: "",
    href: "/media_content/video/series/:id",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "id",
  },
  {
    name: "",
    href: "/media_content/video/series/:seriesId/seasons",
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
    name: "New series",
    href: "/media_content/video/series/create",
  },
  {
    name: "Video files",
    href: "/media_content/video/video_files",
  },
  {
    name: "",
    href: "/media_content/video/video_files",
    query: GET_ONE_VIDEO_FILE,
    dynamicParam: "id",
  },
];
