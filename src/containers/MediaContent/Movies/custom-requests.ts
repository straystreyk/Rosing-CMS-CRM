import { gql } from "@apollo/client";

export const GET_ONE_MOVIE = gql`
  query Movie($id: ID!) {
    data: Movie(id: $id) {
      allowedApiClientIds
      allowedCountries
      altDescription
      castMembers {
        id
        characterName
        role
        position
        person {
          fullName
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
        }
      }
      cmsDistribution
      createdAt
      description
      disallowedCountries
      downloadable
      duration
      firstMidRollOffset
      forbiddenApiClientIds
      genreIds
      externalCatalogId
      id
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
        __typename
      }
      imdbId
      kinopoiskId
      languageIds
      markers
      metadata
      midRollCount
      name
      nthMidRollOffset
      originalName
      position
      preRollCount
      productionCountryIds
      productionYear
      published
      releaseDate
      extraVideos {
        name
        streamSourceId
        kind
      }
      certificationRatings {
        id
        system
        tag
        __typename
      }
      rightHolderId
      slug
      storageTime
      streamSourceIds
      studioIds
      updatedAt
      __typename
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $name: String!
    $slug: String
    $originalName: String
    $description: String
    $altDescription: String
    $languageIds: [ID!]
    $genreIds: [ID!]
    $productionCountryIds: [ID!]
    $duration: Int
    $studioIds: [String!]
    $markers: [String!]
    $position: Int
    $metadata: [JSON!]
    $castMembers: [CastMemberInput!]
    $imageIds: [ID!]
    $streamSourceIds: [ID!]
    $extraVideos: [ExtraVideoInput!]
    $published: Boolean
    $downloadable: Boolean
    $storageTime: Int
    $certificationRatings: [CertificationRatingInput!]
    $allowedApiClientIds: [String!]
    $forbiddenApiClientIds: [String!]
    $allowedCountries: [String!]
    $disallowedCountries: [String!]
    $midRollCount: Int
    $firstMidRollOffset: Int
    $nthMidRollOffset: Int
    $id: ID!
  ) {
    data: updateMovie(
      name: $name
      slug: $slug
      originalName: $originalName
      description: $description
      altDescription: $altDescription
      languageIds: $languageIds
      genreIds: $genreIds
      productionCountryIds: $productionCountryIds
      duration: $duration
      studioIds: $studioIds
      markers: $markers
      position: $position
      metadata: $metadata
      castMembers: $castMembers
      imageIds: $imageIds
      streamSourceIds: $streamSourceIds
      extraVideos: $extraVideos
      published: $published
      downloadable: $downloadable
      storageTime: $storageTime
      certificationRatings: $certificationRatings
      allowedApiClientIds: $allowedApiClientIds
      forbiddenApiClientIds: $forbiddenApiClientIds
      allowedCountries: $allowedCountries
      disallowedCountries: $disallowedCountries
      midRollCount: $midRollCount
      firstMidRollOffset: $firstMidRollOffset
      nthMidRollOffset: $nthMidRollOffset
      id: $id
    ) {
      allowedApiClientIds
      allowedCountries
      altDescription
      castMembers {
        characterName
        createdAt
        id
        person {
          fullName
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
      cmsDistribution
      createdAt
      description
      disallowedCountries
      downloadable
      duration
      externalCatalogId
      extraVideos {
        id
        __typename
      }
      firstMidRollOffset
      forbiddenApiClientIds
      genreIds
      id
      imageIds
      images {
        id
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
      imdbId
      kinopoiskId
      languageIds
      markers
      metadata
      midRollCount
      name
      nthMidRollOffset
      originalName
      position
      preRollCount
      productIds
      productionCountryIds
      productionYear
      published
      releaseDate
      rentPlanIds
      rightHolder {
        id
        __typename
      }
      rightHolderId
      slug
      storageTime
      streamSourceIds
      studioIds
      updatedAt
      __typename
    }
  }
`;

export const GET_ONE_MOVIE_NAME = gql`
  query Movie($id: ID!) {
    item: Movie(id: $id) {
      name
    }
  }
`;

export const GET_ALL_MOVIE = gql`
  query allMovies(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: MovieFilter
  ) {
    items: allMovies(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      id
      streamSourceIds
      position
      externalCatalogId
      name
      published
      slug
    }
    total: _allMoviesMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
      __typename
    }
  }
`;
