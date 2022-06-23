import { Breadcrumb } from "../../../../components/Breadcrumbs/breadcrumbs-links";
import { gql } from "@apollo/client";

const SEARCH_FILTER_GROUP = gql`
  query SearchFilterGroup($id: ID!) {
    item: SearchFilterGroup(id: $id) {
      name
      id
    }
  }
`;

export const searchFiltersGroupLinks: Breadcrumb[] = [
  {
    name: "Search filters groups",
    href: "/pages_and_attributes/filters/search_filters_groups",
  },
  {
    name: "New search filter group",
    href: "/pages_and_attributes/filters/search_filters_groups/create",
  },
  {
    name: "",
    href: "/pages_and_attributes/filters/search_filters_groups/:id",
    query: SEARCH_FILTER_GROUP,
    dynamicParam: "id",
  },
];
