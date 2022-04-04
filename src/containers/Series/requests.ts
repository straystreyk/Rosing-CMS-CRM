import { gql } from "@apollo/client";

export const GET_ONE_SERIES = gql`
  query Series($id: ID!) {
    data: Series(id: $id) {
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
