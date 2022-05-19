import { gql } from "@apollo/client";

export const GET_ALL_CHANNEL_VERSIONS = gql`
  query allChannelVersions($channelId: ID!) {
    allChannelVersions(filter: { channelId: $channelId }) {
      id
      name
    }
  }
`;

export const GET_ALL_TV_PROGRAMS = gql`
  query allEpg($channelVersionId: ID!) {
    data: allEpg(filter: { channelVersionId: $channelVersionId }) {
      id
      day
      countAll
    }
  }
`;
