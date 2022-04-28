import { gql } from "@apollo/client";

export const GET_ONE_PERSON = gql`
  query Person($id: ID!) {
    data: Person(id: $id) {
      createdAt
      fullName
      id
      imageIds
      images {
        id
        createdAt
        file
        height
        id
        kind
        originalUrl
        updatedAt
        width
        size
      }
      imdbId
      kinopoiskId
      updatedAt
      __typename
    }
  }
`;
