import buildGraphQLProvider, { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";

import { authClient } from "./auth-provider";
import { ALL_COUNTRIES } from "./custom-requests";

const getGqlResource = (resource: string) => {
  switch (resource) {
    case "admin_users":
      return "AdminUser";
    case "media_content/movies":
      return "Movie";
    case "datacenters":
      return "Datacenter";
    case "right_holders":
      return "RightHolder";
    case "streams":
      return "Stream";
    case "media_content/video_files":
      return "VideoFile";
    case "channel_versions":
      return "ChannelVersion";
    case "series":
      return "Series";
    case "seasons":
      return "Season";
    case "channels":
      return "Channel";
    case "episodes":
      return "Episode";
    case "genres":
      return "Genre";
    case "radio_stations":
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
    default:
      throw new Error(`Unknown resource ${resource}`);
  }
};

const customBuildQuery =
  (introspection: any) => (fetchType: string, resource: string, params: unknown) => {
    const builtQuery = buildQueryFactory(introspection)(fetchType, resource, params);

    if (fetchType === "GET_LIST" && resource === "Country") {
      return { ...builtQuery, query: ALL_COUNTRIES };
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
