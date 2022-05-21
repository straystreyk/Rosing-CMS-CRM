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
  query allTvPrograms($channelVersionId: ID!) {
    data: allTvPrograms(filter: { channelVersionId: $channelVersionId }) {
      day
      countAll
      epgSourceId
      channelVersionId
    }
  }
`;
