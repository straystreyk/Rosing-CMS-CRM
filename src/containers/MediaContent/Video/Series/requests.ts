import { gql } from "@apollo/client";

export const GET_ONE_SERIES = gql`
  query Series($id: ID!) {
    data: Series(id: $id) {
      allowedApiClientIds
      allowedCountries
      announced
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
        name
        streamSourceId
        kind
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
      metadata
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
    $position: Int
    $published: Boolean
    $announced: Boolean
    $productionYear: Int
    $markers: [String!]
    $studioIds: [String!]
    $languageIds: [ID!]
    $hasSeason: Boolean
    $imdbId: Int
    $kinopoiskId: Int
    $productionCountryIds: [ID!]
    $genreIds: [String!]
    $rightHolderId: ID
    $releaseDate: DateTime
    $certificationRatings: [CertificationRatingInput!]
    $imageIds: [ID!]
    $allowedCountries: [String!]
    $disallowedCountries: [String!]
    $allowedApiClientIds: [String!]
    $forbiddenApiClientIds: [String!]
    $metadata: [JSON!]
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
      position: $position
      published: $published
      announced: $announced
      productionYear: $productionYear
      markers: $markers
      studioIds: $studioIds
      languageIds: $languageIds
      hasSeason: $hasSeason
      imdbId: $imdbId
      kinopoiskId: $kinopoiskId
      productionCountryIds: $productionCountryIds
      genreIds: $genreIds
      rightHolderId: $rightHolderId
      releaseDate: $releaseDate
      certificationRatings: $certificationRatings
      imageIds: $imageIds
      allowedCountries: $allowedCountries
      disallowedCountries: $disallowedCountries
      allowedApiClientIds: $allowedApiClientIds
      forbiddenApiClientIds: $forbiddenApiClientIds
      metadata: $metadata
      castMembers: $castMembers
      extraVideos: $extraVideos
      id: $id
    ) {
      allowedApiClientIds
      allowedCountries
      announced
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
        name
        streamSourceId
        kind
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
        updatedAt
        width
        __typename
      }
      imdbId
      kinopoiskId
      languageIds
      markers
      metadata
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
