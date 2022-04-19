import { gql } from "@apollo/client";

export const GET_ONE_AUDIO_SHOW = gql`
  query AudioShow($id: ID!) {
    item: AudioShow(id: $id) {
      name
    }
  }
`;
