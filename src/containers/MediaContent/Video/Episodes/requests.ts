import { gql } from "@apollo/client";

export const GET_ONE_EPISODE_NAME = gql`
  query Episode($id: ID!) {
    item: Episode(id: $id) {
      name
    }
  }
`;
