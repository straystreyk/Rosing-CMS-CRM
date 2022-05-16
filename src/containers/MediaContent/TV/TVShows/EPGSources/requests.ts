import { gql } from "@apollo/client";

export const GET_EPG_SOURCES_TYPES = gql`
  query allEpgSourceTypes {
    items: allEpgSourceTypes {
      href
      name
      type
    }
  }
`;

export const GET_ONE_EPG_SOURCE = gql`
  query EpgSource($id: ID!) {
    item: EpgSource(id: $id) {
      name
      id
    }
  }
`;
