import { gql } from "@apollo/client";

export const GET_ONE_EPISODE_NAME = gql`
  query Episode($id: ID!) {
    item: Episode(id: $id) {
      name
    }
  }
`;

export const GET_ONE_EPISODE = gql`
  query Episode($id: ID!) {
    data: Episode(id: $id) {
      announced
      description
      downloadable
      duration
      firstMidRollOffset
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
      markers
      metadata
      midRollCount
      name
      nthMidRollOffset
      number
      originalName
      preRollCount
      productionYear
      published
      releaseDate
      season {
        id
        __typename
      }
      seasonId
      slug
      storageTime
      streamSourceIds
      __typename
    }
  }
`;

export const GET_ALL_EPISODES = gql`
  query allEpisodes(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: EpisodeFilter
  ) {
    items: allEpisodes(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      announced
      description
      downloadable
      duration
      firstMidRollOffset
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
      markers
      metadata
      midRollCount
      name
      nthMidRollOffset
      number
      originalName
      preRollCount
      productionYear
      published
      releaseDate
      season {
        id
        __typename
      }
      seasonId
      slug
      storageTime
      streamSourceIds
      __typename
    }
    total: _allEpisodesMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
      __typename
    }
  }
`;
