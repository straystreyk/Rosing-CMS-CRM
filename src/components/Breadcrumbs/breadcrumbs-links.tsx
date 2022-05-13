import { DocumentNode } from "graphql";
import { GET_ONE_MOVIE_NAME } from "../../containers/MediaContent/Video/Movies/custom-requests";
import { GET_ONE_VIDEO_FILE } from "../../containers/MediaContent/Video/VideoFiles/custom-requests";
import { GET_ONE_SERIES_NAME } from "../../containers/MediaContent/Video/Series/requests";
import { GET_ONE_SEASON_NAME } from "../../containers/MediaContent/Video/Seasons/requests";
import { GET_ONE_AUDIO_SHOW_NAME } from "../../containers/MediaContent/Audio/AudioShows/requests";
import { GET_ONE_PART_NAME } from "../../containers/MediaContent/Audio/Parts/requests";
import { GET_ONE_EPISODE_NAME } from "../../containers/MediaContent/Video/Episodes/requests";
import { GET_ONE_NEWS_NAME } from "../../containers/MediaContent/News/requests";
import {
  GET_ONE_CHANNEL,
  GET_ONE_CHANNEL_VERSION,
  GET_ONE_EXTERNAL_CATALOG,
  GET_ONE_GENRE,
  GET_ONE_LABEL,
  GET_ONE_LANGUAGE,
  GET_ONE_PERSON,
  GET_ONE_PROGRAM_TYPE,
  GET_ONE_RADIO_STATION,
  GET_ONE_RIGHT_HOLDER,
  GET_ONE_STUDIO,
  GET_ONE_TV_STREAM,
} from "../Providers/custom-requests";

export type Breadcrumb = {
  name: string;
  href: string;
  alternativeHref?: string;
  alternativeParam?: string;
  breadcrumbName?: string;
  query?: DocumentNode;
  dynamicParam?: string;
  secondDynamicParam?: string;
};

export const breadcrumbsLinks: Breadcrumb[] = [
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
  {
    name: "Attributes",
    href: "/media_content/attributes",
  },
  {
    name: "Providers",
    href: "/media_content/attributes/providers",
  },
  {
    name: "Television",
    href: "/media_content/tv",
  },
  {
    name: "TV Channels",
    href: "/media_content/tv/channels",
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
    href: "/media_content/audio/audio_shows/:audioShowId",
    dynamicParam: "audioShowId",
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "Parts",
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
  //Radio stations
  {
    name: "Radio stations",
    href: "/media_content/radio/radio_stations",
  },
  {
    name: "New radio station",
    href: "/media_content/radio/radio_stations/create",
  },
  {
    name: "",
    href: "/media_content/radio/radio_stations/:id",
    dynamicParam: "id",
    query: GET_ONE_RADIO_STATION,
  },
  //Radio live streams
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
    href: "/media_content/video/series/:seriesId",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "seriesId",
  },
  {
    name: "Seasons",
    href: "/media_content/video/series/:seriesId/seasons",
    query: GET_ONE_SERIES_NAME,
    dynamicParam: "seriesId",
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
    name: "Seasons",
    href: "/media_content/video/seasons",
    alternativeHref: "/media_content/video/series/:seriesId/seasons",
    alternativeParam: "series",
    query: GET_ONE_SEASON_NAME,
    dynamicParam: "seasonId",
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
  //content_providers (External catalog)
  {
    name: "Content providers",
    href: "/media_content/attributes/providers/content_providers",
  },
  {
    name: "New content provider",
    href: "/media_content/attributes/providers/content_providers/create",
  },
  {
    name: "",
    href: "/media_content/attributes/providers/content_providers/:id",
    query: GET_ONE_EXTERNAL_CATALOG,
    dynamicParam: "id",
  },
  //RightHolders
  {
    name: "Right holders",
    href: "/media_content/attributes/providers/right_holders",
  },
  {
    name: "New right holder",
    href: "/media_content/attributes/providers/right_holders/create",
  },
  {
    name: "",
    href: "/media_content/attributes/providers/right_holders/:id",
    query: GET_ONE_RIGHT_HOLDER,
    dynamicParam: "id",
  },
  //Studios
  {
    name: "Studios",
    href: "/media_content/attributes/providers/studios",
  },
  {
    name: "New studio",
    href: "/media_content/attributes/providers/studios/create",
  },
  {
    name: "",
    href: "/media_content/attributes/providers/studios/:id",
    query: GET_ONE_STUDIO,
    dynamicParam: "id",
  },
  //Genres
  {
    name: "Genres",
    href: "/media_content/attributes/genres",
  },
  {
    name: "New genre",
    href: "/media_content/attributes/genres/create",
  },
  {
    name: "",
    href: "/media_content/attributes/genres/:id",
    query: GET_ONE_GENRE,
    dynamicParam: "id",
  },
  //Languages
  {
    name: "Languages",
    href: "/media_content/attributes/languages",
  },
  {
    name: "New language",
    href: "/media_content/attributes/languages/create",
  },
  {
    name: "",
    href: "/media_content/attributes/languages/:id",
    query: GET_ONE_LANGUAGE,
    dynamicParam: "id",
  },
  //Person
  {
    name: "Persons",
    href: "/media_content/attributes/people",
  },
  {
    name: "New person",
    href: "/media_content/attributes/people/create",
  },
  {
    name: "",
    href: "/media_content/attributes/people/:id",
    query: GET_ONE_PERSON,
    dynamicParam: "id",
    breadcrumbName: "fullName",
  },
  //Types of TV show
  {
    name: "Types of TV shows",
    href: "/media_content/attributes/programs_types",
  },
  {
    name: "New type of TV show",
    href: "/media_content/attributes/programs_types/create",
  },
  {
    name: "",
    href: "/media_content/attributes/programs_types/:id",
    query: GET_ONE_PROGRAM_TYPE,
    dynamicParam: "id",
  },
  //Labels
  {
    name: "Labels",
    href: "/media_content/attributes/labels",
  },
  {
    name: "New label",
    href: "/media_content/attributes/labels/create",
  },
  {
    name: "",
    href: "/media_content/attributes/labels/:id",
    query: GET_ONE_LABEL,
    dynamicParam: "id",
  },
  //TV Channels
  {
    name: "TV Channels",
    href: "/media_content/tv/channels/channels",
  },
  {
    name: "New channel",
    href: "/media_content/tv/channels/channels/create",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:id",
    query: GET_ONE_CHANNEL,
    dynamicParam: "id",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:channelId",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
  //TV Streams
  {
    name: "TV streams",
    href: "/media_content/tv/channels/live_streams",
  },
  {
    name: "New TV stream",
    href: "/media_content/tv/channels/live_streams/create",
  },
  {
    name: "",
    href: "/media_content/tv/channels/live_streams/:id",
    query: GET_ONE_TV_STREAM,
    dynamicParam: "id",
  },
  //Blackouts
  {
    name: "Blackouts",
    href: "/media_content/tv/channels/blackouts",
  },
  {
    name: "New blackout",
    href: "/media_content/tv/channels/blackouts/create",
  },
  {
    name: "Edit blackout",
    href: "/media_content/tv/channels/blackouts/:id",
    dynamicParam: "id",
  },
  //overrides
  {
    name: "Overrides",
    href: "/media_content/tv/channels/channel_positions_overrides",
  },
  {
    name: "New override",
    href: "/media_content/tv/channels/channel_positions_overrides/create",
  },
  {
    name: "Edit override",
    href: "/media_content/tv/channels/channel_positions_overrides/:id",
    dynamicParam: "id",
  },
  //Channel versions
  {
    name: "Channel versions",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
  {
    name: "New channel version",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions/create",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions/:id",
    query: GET_ONE_CHANNEL_VERSION,
    dynamicParam: "id",
    secondDynamicParam: "channelId",
  },
];
