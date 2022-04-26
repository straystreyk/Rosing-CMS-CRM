import { DocumentNode } from "graphql";
import { GET_ONE_MOVIE_NAME } from "../../containers/MediaContent/Video/Movies/custom-requests";
import { GET_ONE_VIDEO_FILE } from "../../containers/MediaContent/Video/VideoFiles/custom-requests";
import { GET_ONE_SERIES_NAME } from "../../containers/MediaContent/Video/Series/requests";
import { GET_ONE_SEASON_NAME } from "../../containers/MediaContent/Video/Seasons/requests";
import { GET_ONE_AUDIO_SHOW_NAME } from "../../containers/MediaContent/Audio/AudioShows/requests";
import { GET_ONE_PART_NAME } from "../../containers/MediaContent/Audio/Parts/requests";
import { GET_ONE_EPISODE_NAME } from "../../containers/MediaContent/Video/Episodes/requests";
import { GET_ONE_NEWS_NAME } from "../../containers/MediaContent/News/requests";

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
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:audioShowId/parts",
    dynamicParam: "audioShowId",
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:audioShowId/parts/:id",
    dynamicParam: "id",
    secondDynamicParam: "audioShowId",
    query: GET_ONE_PART_NAME,
  },
  // News
  {
    name: "News",
    href: "/media_content/news",
  },
  {
    name: "New News",
    href: "/media_content/news/create",
  },
  {
    name: "",
    href: "/media_content/news/:id",
    dynamicParam: "id",
    query: GET_ONE_NEWS_NAME,
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
    name: "Radio live streams",
    href: "/media_content/radio/radio_live_streams",
  },
  {
    name: "New radio live stream",
    href: "/media_content/radio/radio_live_streams/create",
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
    name: "Seasons",
    href: "/media_content/video/seasons",
  },
  {
    name: "",
    href: "/media_content/video/seasons/:seasonId",
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
  {
    name: "New series",
    href: "/media_content/video/series/create",
  },
  {
    name: "Video files",
    href: "/media_content/video/video_files",
  },
  {
    name: "New video file",
    href: "/media_content/video/video_files/create",
  },
  {
    name: "",
    href: "/media_content/video/video_files/:id",
    query: GET_ONE_VIDEO_FILE,
    dynamicParam: "id",
  },
];
