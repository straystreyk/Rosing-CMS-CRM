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
      labelIds
      name
      number
      position
      published
      radioLiveStreamId
      updatedAt
      __typename
    }
  }
`;

export const UPDATE_RADIO_LIVE_STREAM = gql`
  mutation updateRadioStation(
    $name: String!
    $description: String
    $number: Int
    $bitrate: Int
    $published: Boolean
    $radioLiveStreamId: ID
    $imageIds: [ID!]
    $position: Int!
    $genreIds: [ID!]
    $labelIds: [ID!]
    $id: ID!
  ) {
    data: updateRadioStation(
      name: $name
      description: $description
      number: $number
      bitrate: $bitrate
      published: $published
      radioLiveStreamId: $radioLiveStreamId
      imageIds: $imageIds
      position: $position
      genreIds: $genreIds
      labelIds: $labelIds
      id: $id
    ) {
      bitrate
      createdAt
      description
      genreIds
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
      labelIds
      name
      number
      position
      published
      radioLiveStreamId
      updatedAt
      __typename
    }
  }
`;
