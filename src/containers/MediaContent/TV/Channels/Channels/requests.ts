import { gql } from "@apollo/client";

export const GET_ONE_CHANNEL_EDIT = gql`
  query Channel($id: ID!) {
    data: Channel(id: $id) {
      allowedApiClientIds
      allowedCountries
      allowedInternetServiceProviderIds
      catchupAvailabilityUnit
      catchupAvailabilityValue
      catchupOffset
      certificationRatings {
        id
        system
        tag
        __typename
      }
      channelVersions {
        id
        __typename
      }
      cmsDistribution
      createdAt
      description
      disallowedCountries
      forbiddenApiClientIds
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
        updatedAt
        width
      }
      languageId
      markers
      mediascopeConfig {
        accountName
        catId
        enabled
        tmsecName
        vcId
        id
        __typename
      }
      metadata
      name
      position
      preRollCount
      productIds
      productionCountryIds
      published
      rentPlanIds
      searchKeywords
      seoDescription
      seoKeywords
      slug
      synopsis
      timeshiftAvailabilityUnit
      timeshiftAvailabilityValue
      updatedAt
      vitrinaTvConfig {
        enabled
        url
        id
        __typename
      }
      __typename
    }
  }
`;
