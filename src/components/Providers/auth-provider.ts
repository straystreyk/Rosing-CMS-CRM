import { AuthProvider } from "ra-core";

import { ApolloClient, InMemoryCache, gql, createHttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getGraphQlEndpoint } from "./get-graph-ql-endpoint";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://192.168.34.0:3000/cable",
    connectionParams: {
      authToken: localStorage.getItem("token"),
    },
  })
);

const httpLink = createHttpLink({
  uri: getGraphQlEndpoint(),
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

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const mutation = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    const result = await authClient.mutate({
      mutation,
      variables: {
        email,
        password,
      },
    });

    localStorage.setItem("token", result.data.login.token);
    window.location.reload();

    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    if (localStorage.getItem("token")) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.reject("Unknown method"),
};
