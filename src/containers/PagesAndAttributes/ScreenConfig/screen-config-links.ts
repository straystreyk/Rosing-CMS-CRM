import { Breadcrumb } from "../../../components/Breadcrumbs/breadcrumbs-links";
import { gql } from "@apollo/client";

const SCREEN_CONFIG = gql`
  query ScreenCardConfig($id: ID!) {
    item: ScreenCardConfig(id: $id) {
      screen
      id
    }
  }
`;

export const screenConfigLinks: Breadcrumb[] = [
  {
    name: "Screen config",
    href: "/pages_and_attributes/screen_configs",
  },
  {
    name: "New screen config",
    href: "/pages_and_attributes/screen_configs/create",
  },
  {
    name: "",
    href: "/pages_and_attributes/screen_configs/:id",
    query: SCREEN_CONFIG,
    breadcrumbName: "screen",
    dynamicParam: "id",
  },
];
