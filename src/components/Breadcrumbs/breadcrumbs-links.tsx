import { DocumentNode } from "graphql";
import {
  GET_ONE_CHANNEL,
  GET_ONE_EXTERNAL_CATALOG,
  GET_ONE_GENRE,
  GET_ONE_LANGUAGE,
  GET_ONE_RIGHT_HOLDER,
  GET_ONE_STUDIO,
  GET_ONE_TV_STREAM,
} from "../Providers/custom-requests";
import { personsLinks } from "../../containers/MediaContent/Attributes/People/people-links";
import { programTypesLinks } from "../../containers/MediaContent/Attributes/ProgramsTypes/programs-types-links";
import { moviesLinks } from "../../containers/MediaContent/Video/Movies/movies-links";
import { audioShowsLinks } from "../../containers/MediaContent/Audio/AudioShows/audio-shows-links";
import { newsLinks } from "../../containers/MediaContent/News/news-links";
import { radioStationsLinks } from "../../containers/MediaContent/Radio/RadioStations/radio-stations-links";
import { radioLiveStreamsLinks } from "../../containers/MediaContent/Radio/RadioLiveStreams/radio-live-streams-links";
import { seriesLinks } from "../../containers/MediaContent/Video/Series/series-links";
import { seasonsLinks } from "../../containers/MediaContent/Video/Seasons/seasons-links";
import { channelVersionsLinks } from "../../containers/MediaContent/TV/Channels/ChannelVersions/channel-versions-links";
import { labelsLinks } from "../../containers/MediaContent/Attributes/Labels/labels-links";
import { episodesLinks } from "../../containers/MediaContent/Video/Episodes/episodes-links";
import { videoFilesLinks } from "../../containers/MediaContent/Video/VideoFiles/video-files-links";
import { epgSourceLinks } from "../../containers/MediaContent/TV/TVShows/EPGSources/epg-source-links";
import { epgLocalEventsLinks } from "../../containers/MediaContent/TV/TVShows/EPGLocalEvents/epg-local-events-links";
import { programEventsLinks } from "../../containers/MediaContent/TV/Channels/ProgramEvents/program-events-links";

export type Breadcrumb = {
  name: string;
  href: string;
  alternativeHref?: string;
  alternativeParam?: string;
  alternativeDynamicParam?: string;
  breadcrumbName?: string;
  query?: DocumentNode;
  dynamicParam?: string;
  secondDynamicParam?: string;
  thirdDynamicParam?: string;
  offLink?: boolean;
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
    name: "Radio",
    href: "/media_content/radio",
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
  {
    name: "TV Channels",
    href: "/media_content/tv/channels/channels",
  },
  {
    name: "TV shows",
    href: "/media_content/tv/tv_shows",
  },

  //Movie
  ...moviesLinks,

  //Audio show
  ...audioShowsLinks,

  // News
  ...newsLinks,

  //Radio stations
  ...radioStationsLinks,

  //Radio live streams
  ...radioLiveStreamsLinks,

  //Series
  ...seriesLinks,

  //Seasons
  ...seasonsLinks,

  //TV Channels
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

  //Channel versions
  ...channelVersionsLinks,

  //ProgramEvents
  ...programEventsLinks,

  //Episodes
  ...episodesLinks,

  //Video files
  ...videoFilesLinks,

  //EPG sources
  ...epgSourceLinks,

  //EPG Local Source Links
  ...epgLocalEventsLinks,

  //Content Providers (External catalog)
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
  ...personsLinks,
  //Types of TV show
  ...programTypesLinks,
  //Labels
  ...labelsLinks,

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
];
