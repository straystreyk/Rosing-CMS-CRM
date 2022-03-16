import { FC } from "react";
import Icon from "@material-ui/icons/QuestionAnswer";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { Show } from "./show";
import { SearchInput } from "../../components/Inputs/search-input";

const resource = "questions";
const filters = [<SearchInput source="name" alwaysOn />];

export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const List: FC = (props) => (
  <ResourceList {...props} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);

export { Icon };
