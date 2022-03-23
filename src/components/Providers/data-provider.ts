import buildGraphQLProvider, { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";

import { authClient } from "./auth-provider";
import { GET_ONE_MOVIE } from "../../containers/Movies/custom-requests";
import { customParseResponse } from "../../react-admin-overrides";
import { GET_ONE_SERIES } from "../../containers/Series/requests";

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
    case "media_content/video/series":
      return "Series";
    case "seasons":
      return "Season";
    case "channels":
      return "Channel";
    case "episodes":
      return "Episode";
    case "genres":
      return "Genre";
    case "media_content/radio/radio_stations":
      return "RadioStation";
    case "audio_shows":
      return "AudioShow";
    case "questions":
      return "Question";
    case "news":
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
    if (fetchType === "GET_ONE" && resource === "Series") {
      return { ...builtQuery, query: GET_ONE_SERIES };
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
