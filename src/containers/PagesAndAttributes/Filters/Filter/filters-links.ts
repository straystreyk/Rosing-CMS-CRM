import { Breadcrumb } from "../../../../components/Breadcrumbs/breadcrumbs-links";
import { gql } from "@apollo/client";

const QUICK_FILTER = gql`
  query QuickFilter($id: ID!) {
    item: QuickFilter(id: $id) {
      name
      id
    }
  }
`;

export const quickFiltersLinks: Breadcrumb[] = [
  {
    name: "Filters",
    href: "/pages_and_attributes/filters/filters",
  },
  {
    name: "New filter",
    href: "/pages_and_attributes/filters/filters/create",
  },
  {
    name: "",
    href: "/pages_and_attributes/filters/filters/:id",
    query: QUICK_FILTER,
    dynamicParam: "id",
  },
];
