import { GET_ONE_PROGRAM_TYPE } from "../../../../components/Providers/custom-requests";

export const programTypesLinks = [
  {
    name: "Types of TV shows",
    href: "/media_content/attributes/programs_types",
  },
  {
    name: "New type of TV show",
    href: "/media_content/attributes/programs_types/create",
  },
  {
    name: "",
    href: "/media_content/attributes/programs_types/:id",
    query: GET_ONE_PROGRAM_TYPE,
    dynamicParam: "id",
  },
];
