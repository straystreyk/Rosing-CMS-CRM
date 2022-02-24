import { gql } from '@apollo/client';

export const GET_CURRENT_SEASON = gql`
  query Season($id: ID!) {
    Season(id: $id) {
      description
      id
      markers
      name
      number
      originalName
      productionYear
      slug
      series {
        id
        name
      }
    }
  } 
`;

export const GET_CURRENT_EPISODES = gql`
  query allEpisodes($seasonId: ID!) {
    allEpisodes(filter: { seasonId: $seasonId }) {
      name 
      id
    }
  }
`;