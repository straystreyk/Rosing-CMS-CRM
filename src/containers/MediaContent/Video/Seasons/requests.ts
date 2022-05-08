import { gql } from "@apollo/client";

export const GET_ONE_SEASON_NAME = gql`
  query Season($id: ID!) {
    item: Season(id: $id) {
      name
      series {
        id
        name
      }
    }
  }
`;
