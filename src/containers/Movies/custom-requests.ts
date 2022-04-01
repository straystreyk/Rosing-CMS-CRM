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
