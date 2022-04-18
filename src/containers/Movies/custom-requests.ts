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
