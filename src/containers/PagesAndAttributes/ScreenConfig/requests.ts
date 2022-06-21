import { gql } from "@apollo/client";

export const ALL_SCREEN_CARD_CONFIG_PARAMS = gql`
  query allScreenCardConfigParams {
    items: allScreenCardConfigParams {
      additionalNames {
        name
      }
      layouts {
        name
        value
      }
    }
  }
`;
