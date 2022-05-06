import { gql } from '@apollo/client';

export const GET_ALL_CHANNEL_VERSIONS = gql`
  query allChannelVersions($channelId: ID!) {
    allChannelVersions(filter:{ channelId: $channelId }) {
      id
      name
    }
  }
`;