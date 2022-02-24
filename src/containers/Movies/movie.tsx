import { FC } from "react";
import Icon from "@material-ui/icons/Movie";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { Show } from "./show";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";

const resource = "media_content/movies";
const filters = [<SearchInput source="name" alwaysOn />];

export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" {...props} />
  </ResourceCreate>
);
export const Edit: FC = (props) => (
  <ResourceEdit {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const List: FC = (props) => (
  <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);

export { Icon };
