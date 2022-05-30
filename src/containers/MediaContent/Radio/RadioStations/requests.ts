import { gql } from "@apollo/client";

export const GET_ONE_RADIO_STATION = gql`
  query RadioStation($id: ID!) {
    data: RadioStation(id: $id) {
      bitrate
      createdAt
      description
      genreIds
      id
      imageIds
      name
      number
      position
      published
      streamSourceId
      updatedAt
      __typename
    }
  }
`;
