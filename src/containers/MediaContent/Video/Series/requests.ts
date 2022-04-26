import { gql } from "@apollo/client";

export const GET_ONE_SERIES = gql`
  query Series($id: ID!) {
    data: Series(id: $id) {
      published
      castMembers {
        characterName
        createdAt
        id
        person {
          id
          fullName
          kinopoiskId
          imdbId
          images {
            createdAt
            file
            height
            id
            kind
            originalUrl
            updatedAt
            width
            __typename
          }
          __typename
        }
        position
        role
        updatedAt
        __typename
      }
      certificationRatings {
        id
        system
        tag
        __typename
      }
      description
      extraVideos {
        id
        __typename
      }
      genreIds
      id
      imageIds
      images {
        createdAt
        file
        height
        id
        kind
        originalUrl
        size
        updatedAt
        width
        __typename
      }
      markers
      createdAt
      updatedAt
      name
      originalName
      productionYear
      productionCountryIds
      releaseDate
      hasSeason
      rightHolder {
        id
        __typename
      }
      extraVideos {
        name
        streamSourceId
        kind
      }
      rightHolderId
      seasons {
        id
        __typename
      }
      slogan
      slug
      __typename
    }
  }
`;

export const GET_ALL_SERIES = gql`
  query allSeries(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: SeriesFilter
  ) {
    items: allSeries(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      id
      name
      position
      slug
      seasons {
        id
      }
    }
    total: _allSeriesMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
      __typename
    }
  }
`;

export const GET_ONE_SERIES_NAME = gql`
  query Series($id: ID!) {
    item: Series(id: $id) {
      name
    }
  }
`;

export const UPDATE_SERIES = gql`
  mutation updateSeries(
    $name: String!
    $slug: String
    $originalName: String
    $description: String
    $slogan: String
    $published: Boolean
    $hasSeason: Boolean
    $genreIds: [String!]
    $certificationRatings: [CertificationRatingInput!]
    $imageIds: [ID!]
    $castMembers: [CastMemberInput!]
    $extraVideos: [ExtraVideoInput!]
    $id: ID!
  ) {
    data: updateSeries(
      name: $name
      slug: $slug
      originalName: $originalName
      description: $description
      slogan: $slogan
      published: $published
      hasSeason: $hasSeason
      genreIds: $genreIds
      certificationRatings: $certificationRatings
      imageIds: $imageIds
      castMembers: $castMembers
      extraVideos: $extraVideos
      id: $id
    ) {
      allowedApiClientIds
      allowedCountries
      castMembers {
        characterName
        createdAt
        id
        person {
          id
          fullName
          kinopoiskId
          imdbId
          images {
            createdAt
            file
            height
            id
            kind
            originalUrl
            updatedAt
            width
            __typename
          }
          __typename
        }
        position
        role
        updatedAt
        __typename
      }
      certificationRatings {
        id
        system
        tag
        __typename
      }
      createdAt
      description
      disallowedCountries
      externalCatalogId
      extraVideos {
        id
        __typename
      }
      forbiddenApiClientIds
      genreIds
      hasSeason
      id
      imageIds
      images {
        createdAt
        file
        height
        id
        kind
        originalUrl
        size
        updatedAt
        width
        __typename
      }
      imdbId
      kinopoiskId
      languageIds
      markers
      name
      originalName
      position
      productionCountryIds
      productionYear
      published
      releaseDate
      rightHolder {
        id
        __typename
      }
      rightHolderId
      seasons {
        id
        __typename
      }
      slogan
      slug
      studioIds
      updatedAt
      __typename
    }
  }
`;
