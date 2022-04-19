import { gql } from "@apollo/client";

export const GET_ALL_VIDEO_FILES = gql`
  query allVideoFiles(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: VideoFileFilter
  ) {
    items: allVideoFiles(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      allowedDrms
      datacenterId
      id
      name
      streamingUid
      __typename
    }
    total: _allVideoFilesMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
      __typename
    }
  }
`;

export const GET_ONE_VIDEO_FILE = gql`
  query VideoFile($id: ID!) {
    item: VideoFile(id: $id) {
      name
    }
  }
`;
