import buildGraphQLProvider from "ra-data-graphql-simple";

import { authClient } from "../auth-provider";
import { getGqlResource } from "./get-gql-resource";
import { customBuildQuery } from "./build-query";

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
