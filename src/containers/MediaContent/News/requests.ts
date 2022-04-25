import { gql } from "@apollo/client";

export const GET_ONE_NEWS = gql`
  query News($id: ID!) {
    data: News(id: $id) {
      bodyTemplate
      bodyText
      cmsDistribution
      compiledDistribution
      externalCatalogId
      id
      markers
      name
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
      published
      publishedAt
      relevantCollectionId
      seoDescription
      seoKeywords
      seoTitle
      slug
      streamSourceId
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
