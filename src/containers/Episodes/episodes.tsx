import { FC } from "react";
import Icon from "@material-ui/icons/VideoCallRounded";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";

const resource = "episodes";
const filters = [<SearchInput source="name" alwaysOn />];

export const List: FC = (props) => (
  <ResourceList {...props} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
export const Create: FC = (props) => (
  <ResourceCreate redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: FC = (props) => (
  <ResourceEdit redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
