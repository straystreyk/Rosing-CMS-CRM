import { Breadcrumb } from "../../../components/Breadcrumbs/breadcrumbs-links";
import { gql } from "@apollo/client";

const QUESTION = gql`
  query Question($id: ID!) {
    item: Question(id: $id) {
      questionTemplate
      id
    }
  }
`;

export const questionLinks: Breadcrumb[] = [
  {
    name: "Question",
    href: "/pages_and_attributes/questions",
  },
  {
    name: "New question",
    href: "/pages_and_attributes/questions/create",
  },
  {
    name: "",
    href: "/pages_and_attributes/questions/:id",
    query: QUESTION,
    breadcrumbName: "questionTemplate",
    dynamicParam: "id",
  },
];
