import { FC } from "react";

import { ResourceEdit, ResourceList, ResourceCreate } from "../../components/ResourceView";
import Icon from "@material-ui/icons/CastConnected";
import { Show } from "./show";
import { Form } from "./form";

import { TextInput } from "../../components/Inputs";

const resource = "channels";

const filters = [
  <TextInput source="slug" />,
  <TextInput source="synopsis" />,
  <TextInput source="description" />,
  <TextInput source="position" />,
];

export const List: FC = (props) => (
  <ResourceList {...props} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
// if u need sidebar filters u must do this
// <ResourceList {...props} sideFilters={sideFilters} filters={filters} resource={resource}><Show
//   resource={resource} /></ResourceList>;
export const Edit: FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form {...props} resource={resource} />
  </ResourceEdit>
);
export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form {...props} resource={resource} />
  </ResourceCreate>
);

export { Icon };
