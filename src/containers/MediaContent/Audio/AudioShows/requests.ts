import { gql } from "@apollo/client";

export const GET_ONE_AUDIO_SHOW_NAME = gql`
  query AudioShow($id: ID!) {
    item: AudioShow(id: $id) {
      name
    }
  }
`;

export const GET_ONE_AUDIO_SHOW = gql`
  query AudioShow($id: ID!) {
    data: AudioShow(id: $id) {
      allowedCountries
      altDescription
      castMembers {
        characterName
        createdAt
        id
        person {
          id
          fullName
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
          }
        }
        position
        role
        updatedAt
        __typename
      }
      parts {
        id
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
      duration
      externalCatalogId
      id
      markers
      metadata
      name
      originalName
      position
      productionYear
      published
      releaseDate
      rightHolder {
        id
        __typename
      }
      slogan
      slug
      updatedAt
      __typename
    }
  }
`;
