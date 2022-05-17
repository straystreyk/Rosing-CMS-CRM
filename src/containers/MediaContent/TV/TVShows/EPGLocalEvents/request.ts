import { gql } from "@apollo/client";

export const GET_ONE_EPG_LOCAL_EVENT = gql`
  query EpgLocalEvent($id: ID!) {
    data: EpgLocalEvent(id: $id) {
      certificationRatings {
        id
        system
        tag
        __typename
      }
      description
      endAt
      epgSourceId
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
        __typename
      }
      name
      startAt
      __typename
    }
  }
`;

export const GET_EPG_LOCAL_EVENT_NAME = gql`
  query EpgLocalEvent($id: ID!) {
    item: EpgLocalEvent(id: $id) {
      id
      name
    }
  }
`;
