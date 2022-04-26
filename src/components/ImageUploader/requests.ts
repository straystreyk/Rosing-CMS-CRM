import { gql } from "@apollo/client";

export const GET_IMAGES_TYPES = gql`
  query allImageTypes($fieldName: String!) {
    items: allImageTypes(fieldName: $fieldName) {
      kind
      prettyName
    }
  }
`;
