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

export const UPDATE_EPISODE = gql`
  mutation updateEpisode(
    $id: ID!
    $slug: String
    $name: String
    $originalName: String
    $description: String
    $releaseDate: Date
    $imageIds: [ID!]
    $number: Int
    $duration: Int
    $markers: [String!]
    $published: Boolean
    $announced: Boolean
    $seasonId: ID
    $streamSourceIds: [ID!]
    $downloadable: Boolean
    $preRollCount: Int
    $midRollCount: Int
    $firstMidRollOffset: Int
    $nthMidRollOffset: Int
    $metadata: [JSON!]
  ) {
    data: updateEpisode(
      id: $id
      slug: $slug
      name: $name
      originalName: $originalName
      description: $description
      releaseDate: $releaseDate
      imageIds: $imageIds
      number: $number
      duration: $duration
      markers: $markers
      published: $published
      announced: $announced
      seasonId: $seasonId
      streamSourceIds: $streamSourceIds
      downloadable: $downloadable
      preRollCount: $preRollCount
      midRollCount: $midRollCount
      firstMidRollOffset: $firstMidRollOffset
      nthMidRollOffset: $nthMidRollOffset
      metadata: $metadata
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
  }
`;
