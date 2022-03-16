import { gql } from "@apollo/client";

export const GET_STREAM = gql`
  query Stream($resourceId: ID!, $protocol: String!) {
    stream: Stream(resourceId: $resourceId, protocol: $protocol) {
      url
    }
  }
`;
