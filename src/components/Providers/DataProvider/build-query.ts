import { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";
import { customParseResponse } from "../../../react-admin-overrides";
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
import { GET_ALL_VIDEO_FILES } from "../../../containers/MediaContent/Video/VideoFiles/custom-requests";
import { GET_ONE_AUDIO_SHOW } from "../../../containers/MediaContent/Audio/AudioShows/requests";
import { GET_ONE_NEWS, UPDATE_NEWS } from "../../../containers/MediaContent/News/requests";
import { GET_EDIT_EXTERNAL_CATALOG } from "../../../containers/MediaContent/Attributes/Providers/ContentProviders/requests";
import { GET_EDIT_STUDIO } from "../../../containers/MediaContent/Attributes/Providers/Studios/requests";
import { GET_ONE_PERSON } from "../../../containers/MediaContent/Attributes/People/requests";
import { GET_ONE_EPG_LOCAL_EVENT } from "../../../containers/MediaContent/TV/TVShows/EPGLocalEvents/request";

export const customBuildQuery =
  (introspection: any) => (fetchType: string, resource: string, params: unknown) => {
    const builtQuery = buildQueryFactory(introspection)(fetchType, resource, params);
    builtQuery.parseResponse = customParseResponse(fetchType);

    if (fetchType === "GET_ONE" && resource === "Movie") {
      return { ...builtQuery, query: GET_ONE_MOVIE };
    }
    if (fetchType === "GET_ONE" && resource === "Channel") {
      return { ...builtQuery, query: GET_ONE_CHANNEL_EDIT };
    }
    if (fetchType === "GET_LIST" && resource === "Movie") {
      return { ...builtQuery, query: GET_ALL_MOVIE };
    }
    if (fetchType === "UPDATE" && resource === "Movie") {
      return { ...builtQuery, query: UPDATE_MOVIE };
    }
    if (fetchType === "GET_LIST" && resource === "Series") {
      return { ...builtQuery, query: GET_ALL_SERIES };
    }
    // if (fetchType === "UPDATE" && resource === "Series") {
    //   return { ...builtQuery, query: UPDATE_SERIES };
    // }
    if (fetchType === "GET_LIST" && resource === "VideoFile") {
      return { ...builtQuery, query: GET_ALL_VIDEO_FILES };
    }
    if (fetchType === "GET_ONE" && resource === "Series") {
      return { ...builtQuery, query: GET_ONE_SERIES };
    }
    if (fetchType === "GET_ONE" && resource === "AudioShow") {
      return { ...builtQuery, query: GET_ONE_AUDIO_SHOW };
    }
    // News
    if (fetchType === "GET_ONE" && resource === "News") {
      return { ...builtQuery, query: GET_ONE_NEWS };
    }
    if (fetchType === "UPDATE" && resource === "News") {
      return { ...builtQuery, query: UPDATE_NEWS };
    }
    if (fetchType === "GET_ONE" && resource === "ExternalCatalog") {
      return { ...builtQuery, query: GET_EDIT_EXTERNAL_CATALOG };
    }
    if (fetchType === "GET_ONE" && resource === "Studio") {
      return { ...builtQuery, query: GET_EDIT_STUDIO };
    }
    if (fetchType === "GET_ONE" && resource === "Person") {
      return { ...builtQuery, query: GET_ONE_PERSON };
    }
    if (fetchType === "GET_ONE" && resource === "EpgLocalEvent") {
      return { ...builtQuery, query: GET_ONE_EPG_LOCAL_EVENT };
    }

    return builtQuery;
  };
