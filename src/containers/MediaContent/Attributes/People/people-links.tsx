import { GET_ONE_PERSON } from "../../../../components/Providers/custom-requests";
export const personsLinks = [
  {
    name: "Persons",
    href: "/media_content/attributes/people",
  },
  {
    name: "New person",
    href: "/media_content/attributes/people/create",
  },
  {
    name: "",
    href: "/media_content/attributes/people/:id",
    query: GET_ONE_PERSON,
    dynamicParam: "id",
    breadcrumbName: "fullName",
  },
];
