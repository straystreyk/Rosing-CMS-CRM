import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_EXPORT = gql`
  subscription exportTaskAdded {
    data: exportTaskAdded {
      exportTask {
        status
        progress
        file
        exportType
        format
        id
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
      exportType
      format
      id
    }
  }
`;

export const SET_REPORT_DOWNLOADED = gql`
  mutation setReportDownloaded($id: ID!) {
    data: setReportDownloaded(id: $id) {
      status
      progress
      file
      exportType
      format
      id
    }
  }
`;
