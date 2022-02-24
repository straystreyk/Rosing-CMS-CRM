import { gql } from '@apollo/client';

export const GET_CURRENT_SEASONS = gql`
  query allSeasons($seriesId: ID!) {
    allSeasons(filter:{ seriesId: $seriesId }) {
      id
      name
      number
    }
  }
`;

export const GET_CURRENT_SERIES = gql`
  query Series($id: ID!) {
    Series(id: $id) {
        description
        id
        markers
        name
        originalName
        productionYear
        slug
        certificationRatingTag
        certificationRatingSystem
        releaseDate 
        rightHolder {
          id
          name
        }
        slogan
    }
  }
`;