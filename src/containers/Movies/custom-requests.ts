import { gql } from "@apollo/client";

export const GET_ONE_MOVIE = gql`
  query Movie($id: ID!) {
    data: Movie(id: $id) {
      allowedApiClients
      allowedCountries
      altDescription
      availableEnd
      availableStart
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
      forbiddenApiClients
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
      languages
      markers
      metadata
      midRollCount
      name
      nthMidRollOffset
      originalName
      position
      preRollCount
      productionCountriesIds
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
      studios
      updatedAt
      __typename
    }
  }
`;
