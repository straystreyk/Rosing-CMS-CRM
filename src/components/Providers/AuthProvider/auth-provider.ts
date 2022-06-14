import { AuthProvider } from "ra-core";
import { gql } from "@apollo/client";
import { authClient } from "./client";

const mutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
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
  checkError: (error) => {
    if (error instanceof Error && error.message.includes("401")) {
      localStorage.removeItem("token");
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: (params) => {
    if (localStorage.getItem("token")) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.reject("Unknown method"),
};
