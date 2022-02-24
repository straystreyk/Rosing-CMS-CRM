import { gql } from "@apollo/client";

export const ALL_COUNTRIES = gql`
  query {
    items: allCountries {
      alpha2
      name
      __typename
    }
  }
`;
