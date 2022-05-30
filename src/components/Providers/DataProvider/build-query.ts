import { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";
import { BuildQueryResult, IntrospectionResult } from "ra-data-graphql";
import { DocumentNode } from "graphql";

import { customParseResponse } from "../../../react-admin-overrides";
import { MODELS_WITH_CUSTOM_REQUESTS } from "./models-with-custom-request";

type FetchTypes =
  | "GET_ONE"
  | "GET_LIST"
  | "GET_MANY"
  | "GET_MANY_REFERENCE"
  | "UPDATE"
  | "CREATE"
  | "DELETE";

const getFinalBuiltQuery = (resource: string, fetchType: string, builtQuery: BuildQueryResult) => {
  let finalBuiltQuery = builtQuery;

  MODELS_WITH_CUSTOM_REQUESTS.forEach((model) => {
    if (model.resource === resource && model.queries[fetchType as FetchTypes]) {
      finalBuiltQuery = {
        ...builtQuery,
        query: model.queries[fetchType as FetchTypes] as DocumentNode,
      };
    }
  });

  return finalBuiltQuery;
};

export const customBuildQuery =
  (introspection: IntrospectionResult) =>
  (fetchType: string, resource: string, params: unknown) => {
    const builtQuery = buildQueryFactory(introspection)(fetchType, resource, params);
    builtQuery.parseResponse = customParseResponse(fetchType);

    return getFinalBuiltQuery(resource, fetchType, builtQuery);
  };
