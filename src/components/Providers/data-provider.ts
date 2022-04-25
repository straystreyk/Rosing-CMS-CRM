import buildGraphQLProvider, { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";
import { customParseResponse } from "../../react-admin-overrides";

import { authClient } from "./auth-provider";
import {
  GET_ALL_MOVIE,
  GET_ONE_MOVIE,
  UPDATE_MOVIE,
} from "../../containers/MediaContent/Movies/custom-requests";
import { GET_ALL_SERIES, GET_ONE_SERIES } from "../../containers/MediaContent/Series/requests";
import { GET_ALL_VIDEO_FILES } from "../../containers/MediaContent/VideoFiles/custom-requests";
import { GET_ONE_AUDIO_SHOW } from "../../containers/Audio/AudioShows/requests";
import { GET_ONE_NEWS } from "../../containers/MediaContent/News/requests";

const getGqlResource = (resource: string) => {
  switch (resource) {
    case "admin_users":
      return "AdminUser";
    case "media_content/video/movies":
      return "Movie";
    case "datacenters":
      return "Datacenter";
    case "right_holders":
      return "RightHolder";
    case "streams":
      return "Stream";
    case "media_content/video/video_files":
      return "VideoFile";
    case "channel_versions":
      return "ChannelVersion";
    case "media_content/video/seasons/:seasonId/episodes":
      return "Episode";
    case "media_content/video/series/:seriesId/seasons":
      return "Season";
    case "media_content/video/series":
      return "Series";
    case "media_content/audio/audio_shows/:audioShowId/parts":
      return "Part";
    case "media_content/audio/audio_shows":
      return "AudioShow";
    case "channels":
      return "Channel";
    case "studios":
      return "Studio";
    case "languages":
      return "Language";
    case "episodes":
      return "Episode";
    case "api_clients":
      return "ApiClient";
    case "external_catalog":
      return "ExternalCatalog";
    case "genres":
      return "Genre";
    case "media_content/radio/radio_stations":
      return "RadioStation";
    case "questions":
      return "Question";
    case "images":
      return "Image";
    case "media_content/news":
      return "News";
    case "people":
      return "Person";
    case "castMembers":
      return "CastMember";
    case "countries":
      return "Country";
    case "production_countries":
      return "ProductionCountry";
    default:
      throw new Error(`Unknown resource ${resource}`);
  }
};

const customBuildQuery =
  (introspection: any) => (fetchType: string, resource: string, params: unknown) => {
    const builtQuery = buildQueryFactory(introspection)(fetchType, resource, params);
    builtQuery.parseResponse = customParseResponse(fetchType);

    if (fetchType === "GET_ONE" && resource === "Movie") {
      return { ...builtQuery, query: GET_ONE_MOVIE };
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
    if (fetchType === "GET_LIST" && resource === "VideoFile") {
      return { ...builtQuery, query: GET_ALL_VIDEO_FILES };
    }
    if (fetchType === "GET_ONE" && resource === "Series") {
      return { ...builtQuery, query: GET_ONE_SERIES };
    }
    if (fetchType === "GET_ONE" && resource === "AudioShow") {
      return { ...builtQuery, query: GET_ONE_AUDIO_SHOW };
    }
    if (fetchType === "GET_ONE" && resource === "News") {
      return { ...builtQuery, query: GET_ONE_NEWS };
    }

    return builtQuery;
  };

export const dataProvider = async () => {
  const dataProvider = await buildGraphQLProvider({
    client: authClient,
    buildQuery: customBuildQuery,
  });

  const defaultDataProvider = {
    create: () => Promise.reject({ data: null }),
    delete: () => Promise.reject({ data: null }),
    deleteMany: () => Promise.resolve({ data: [] }),
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    getOne: () => Promise.reject({ data: null }),
    update: () => Promise.reject({ data: null }),
    updateMany: () => Promise.resolve({ data: [] }),
  };

  return new Proxy(defaultDataProvider, {
    get: (target, name) => {
      if (typeof name === "symbol" || name === "then") {
        return;
      }
      return async (resource: string, params: any) => {
        return dataProvider[name](getGqlResource(resource), params);
      };
    },
  });
};
