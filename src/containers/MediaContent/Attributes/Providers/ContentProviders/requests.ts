import { gql } from "@apollo/client";

export const GET_EDIT_EXTERNAL_CATALOG = gql`
  query ExternalCatalog($id: ID!) {
    data: ExternalCatalog(id: $id) {
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
      platformsPackageId
      uid
      __typename
    }
  }
`;
