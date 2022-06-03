import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_EXPORT = gql`
  subscription exportTaskAdded {
    data: exportTaskAdded {
      exportTask {
        status
        progress
        file
      }
    }
  }
`;

export const CHECK_SUBSCRIPTION = gql`
  query lastExport($type: String!) {
    data: lastExport(type: $type) {
      status
      progress
      file
      id
    }
  }
`;
