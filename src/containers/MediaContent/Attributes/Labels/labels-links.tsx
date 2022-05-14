import { GET_ONE_LABEL } from "../../../../components/Providers/custom-requests";

export const labelsLinks = [
  {
    name: "Labels",
    href: "/media_content/attributes/labels",
  },
  {
    name: "New label",
    href: "/media_content/attributes/labels/create",
  },
  {
    name: "",
    href: "/media_content/attributes/labels/:id",
    query: GET_ONE_LABEL,
    dynamicParam: "id",
  },
];
