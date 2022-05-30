import { DocumentNode } from "graphql";
import {
  GET_ALL_MOVIE,
  GET_ONE_MOVIE,
  UPDATE_MOVIE,
} from "../../../containers/MediaContent/Video/Movies/custom-requests";
import { GET_ONE_CHANNEL_EDIT } from "../../../containers/MediaContent/TV/Channels/Channels/requests";
import {
  GET_ALL_SERIES,
  GET_ONE_SERIES,
} from "../../../containers/MediaContent/Video/Series/requests";
import {
  GET_ALL_EPISODES,
  GET_ONE_EPISODE,
} from "../../../containers/MediaContent/Video/Episodes/requests";
import { GET_ONE_NEWS, UPDATE_NEWS } from "../../../containers/MediaContent/News/requests";
import { GET_ONE_PERSON } from "../../../containers/MediaContent/Attributes/People/requests";
import { GET_EDIT_STUDIO } from "../../../containers/MediaContent/Attributes/Providers/Studios/requests";
import { GET_ALL_VIDEO_FILES } from "../../../containers/MediaContent/Video/VideoFiles/custom-requests";
import { GET_ONE_AUDIO_SHOW } from "../../../containers/MediaContent/Audio/AudioShows/requests";
import { GET_EDIT_EXTERNAL_CATALOG } from "../../../containers/MediaContent/Attributes/Providers/ContentProviders/requests";
import { GET_ONE_EPG_LOCAL_EVENT } from "../../../containers/MediaContent/TV/TVShows/EPGLocalEvents/request";
import { GET_ONE_RADIO_STATION } from "../../../containers/MediaContent/Radio/RadioStations/requests";

export const MODELS_WITH_CUSTOM_REQUESTS: {
  resource: string;
  queries: {
    GET_ONE?: DocumentNode;
    GET_LIST?: DocumentNode;
    GET_MANY?: DocumentNode;
    GET_MANY_REFERENCE?: DocumentNode;
    UPDATE?: DocumentNode;
    CREATE?: DocumentNode;
    DELETE?: DocumentNode;
  };
}[] = [
  {
    resource: "Movie",
    queries: {
      GET_ONE: GET_ONE_MOVIE,
      UPDATE: UPDATE_MOVIE,
      GET_LIST: GET_ALL_MOVIE,
    },
  },
  {
    resource: "Channel",
    queries: {
      GET_ONE: GET_ONE_CHANNEL_EDIT,
    },
  },
  {
    resource: "Series",
    queries: {
      GET_ONE: GET_ONE_SERIES,
      GET_LIST: GET_ALL_SERIES,
    },
  },
  {
    resource: "Episode",
    queries: {
      GET_LIST: GET_ALL_EPISODES,
      GET_ONE: GET_ONE_EPISODE,
    },
  },
  {
    resource: "News",
    queries: {
      UPDATE: UPDATE_NEWS,
      GET_ONE: GET_ONE_NEWS,
    },
  },
  {
    resource: "News",
    queries: {
      UPDATE: UPDATE_NEWS,
      GET_ONE: GET_ONE_NEWS,
    },
  },
  {
    resource: "Person",
    queries: {
      GET_ONE: GET_ONE_PERSON,
    },
  },
  {
    resource: "VideoFile",
    queries: {
      GET_LIST: GET_ALL_VIDEO_FILES,
    },
  },
  {
    resource: "Studio",
    queries: {
      GET_ONE: GET_EDIT_STUDIO,
    },
  },
  {
    resource: "RadioStation",
    queries: {
      GET_ONE: GET_ONE_RADIO_STATION,
    },
  },
  {
    resource: "AudioShow",
    queries: {
      GET_ONE: GET_ONE_AUDIO_SHOW,
    },
  },
  {
    resource: "ExternalCatalog",
    queries: {
      GET_ONE: GET_EDIT_EXTERNAL_CATALOG,
    },
  },
  {
    resource: "EpgLocalEvent",
    queries: {
      GET_ONE: GET_ONE_EPG_LOCAL_EVENT,
    },
  },
];
