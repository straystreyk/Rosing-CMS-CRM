import { gql } from "@apollo/client";

export const GET_ONE_PART_NAME = gql`
  query Part($id: ID!) {
    item: Part(id: $id) {
      name
    }
  }
`;
