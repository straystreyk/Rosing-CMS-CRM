import { gql } from "@apollo/client";

export const GET_ONE_NEWS = gql`
  query News($id: ID!) {
    data: News(id: $id) {
      bodyTemplate
      bodyText
      cmsDistribution
      compiledDistribution
      createdAt
      externalCatalogId
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
      markers
      name
      published
      publishedAt
      relevantCollectionId
      seoDescription
      seoKeywords
      seoTitle
      slug
      streamSourceId
      updatedAt
      __typename
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation updateNews(
    $name: String!
    $slug: String
    $published: Boolean
    $bodyTemplate: String
    $markers: [String!]
    $streamSourceId: ID
    $externalCatalogId: ID
    $bodyText: String
    $imageIds: [ID!]
    $id: ID!
  ) {
    data: updateNews(
      name: $name
      slug: $slug
      published: $published
      bodyTemplate: $bodyTemplate
      markers: $markers
      streamSourceId: $streamSourceId
      externalCatalogId: $externalCatalogId
      bodyText: $bodyText
      imageIds: $imageIds
      id: $id
    ) {
      bodyTemplate
      bodyText
      cmsDistribution
      compiledDistribution
      createdAt
      externalCatalogId
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
      markers
      name
      published
      publishedAt
      relevantCollectionId
      seoDescription
      seoKeywords
      seoTitle
      slug
      streamSourceId
      updatedAt
      __typename
    }
  }
`;

export const GET_ONE_NEWS_NAME = gql`
  query News($id: ID!) {
    item: News(id: $id) {
      name
    }
  }
`;
