import { gql } from "@apollo/client";

export const GET_EDIT_STUDIO = gql`
  query Studio($id: ID!) {
    data: Studio(id: $id) {
      createdAt
      id
      imageIds
      images {
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
      name
      nameTranslations
      slug
      updatedAt
      __typename
    }
  }
`;
