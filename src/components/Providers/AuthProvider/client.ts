import ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import { getGraphQlEndpoints } from "../get-graph-ql-endpoint";
import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new ActionCableLink({ cable: ActionCable.createConsumer(getGraphQlEndpoints().ws) });

const httpLink = createHttpLink({
  uri: getGraphQlEndpoints().http,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLinks = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const authClient = new ApolloClient({
  link: authLink.concat(splitLinks),
  cache: new InMemoryCache(),
});
