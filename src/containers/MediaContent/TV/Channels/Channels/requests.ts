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
        __typename
      }
      languageId
      markers
      mediascopeConfig {
        accountName
        catId
        enabled
        id
        tmsecName
        vcId
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
        id
        url
        __typename
      }
      __typename
    }
  }
`;

export const UPDATE_CHANNEL = gql`
  mutation updateChannel(
    $name: String!
    $description: String
    $slug: String
    $languageId: ID
    $genreIds: [ID!]
    $productionCountryIds: [ID!]
    $position: Int
    $markers: [String!]
    $synopsis: String
    $searchKeywords: [String!]
    $seoDescription: String
    $seoKeywords: String
    $metadata: [JSON!]
    $imageIds: [ID!]
    $catchupAvailabilityValue: Int
    $catchupAvailabilityUnit: String
    $timeshiftAvailabilityValue: Int
    $timeshiftAvailabilityUnit: String
    $catchupOffset: Int
    $mediascopeConfig: MediascopeConfigInput
    $vitrinaTvConfig: VitrinaTvConfigInput
    $preRollCount: Int
    $published: Boolean
    $cmsDistribution: String
    $certificationRatings: [CertificationRatingInput!]
    $allowedApiClientIds: [ID!]
    $forbiddenApiClientIds: [ID!]
    $allowedCountries: [String!]
    $disallowedCountries: [String!]
    $allowedInternetServiceProviderIds: [ID!]
    $productIds: [ID!]
    $rentPlanIds: [ID!]
    $id: ID!
  ) {
    data: updateChannel(
      name: $name
      description: $description
      slug: $slug
      languageId: $languageId
      genreIds: $genreIds
      productionCountryIds: $productionCountryIds
      position: $position
      markers: $markers
      synopsis: $synopsis
      searchKeywords: $searchKeywords
      seoDescription: $seoDescription
      seoKeywords: $seoKeywords
      metadata: $metadata
      imageIds: $imageIds
      catchupAvailabilityValue: $catchupAvailabilityValue
      catchupAvailabilityUnit: $catchupAvailabilityUnit
      timeshiftAvailabilityValue: $timeshiftAvailabilityValue
      timeshiftAvailabilityUnit: $timeshiftAvailabilityUnit
      catchupOffset: $catchupOffset
      mediascopeConfig: $mediascopeConfig
      vitrinaTvConfig: $vitrinaTvConfig
      preRollCount: $preRollCount
      published: $published
      cmsDistribution: $cmsDistribution
      certificationRatings: $certificationRatings
      allowedApiClientIds: $allowedApiClientIds
      forbiddenApiClientIds: $forbiddenApiClientIds
      allowedCountries: $allowedCountries
      disallowedCountries: $disallowedCountries
      allowedInternetServiceProviderIds: $allowedInternetServiceProviderIds
      productIds: $productIds
      rentPlanIds: $rentPlanIds
      id: $id
    ) {
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
        __typename
      }
      languageId
      markers
      mediascopeConfig {
        accountName
        catId
        enabled
        id
        tmsecName
        vcId
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
        id
        url
        __typename
      }
      __typename
    }
  }
`;

export const GET_ALL_CHANNELS = gql`
  query allChannels(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: ChannelFilter
  ) {
    items: allChannels(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      channelVersions {
        id
      }
      id
      name
      position
      timeshiftAvailabilityUnit
      timeshiftAvailabilityValue
    }
    total: _allChannelsMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
      __typename
    }
  }
`;
