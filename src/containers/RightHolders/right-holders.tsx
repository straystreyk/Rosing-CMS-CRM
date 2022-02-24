import { FC } from "react";
import Icon from "@material-ui/icons/Lock";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { Show } from "./show";
import { SearchInput } from "../../components/Inputs/search-input";
import { ListTabProps } from "../../components/Tabs/list-page-tabs";

const resource = "right_holders";
const filters = [<SearchInput source="name" alwaysOn />];

const listTabs: ListTabProps[] = [
  {
    name: "Right Holders",
    link: "/right_holders",
  },
  {
    name: "Users",
    link: "/admin_users",
  },
];

export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceCreate>
);
export const Edit: FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceEdit>
);
export const List: FC = (props) => (
  <ResourceList {...props} filters={filters} resource={resource} listTabs={listTabs}>
    <Show resource={resource} />
  </ResourceList>
);

export { Icon };
