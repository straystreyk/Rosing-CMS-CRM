import * as React from "react";
import { CreateProps } from "ra-ui-materialui";
import Icon from "@material-ui/icons/Announcement";

import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../components/ResourceView";

import { Form } from "./form";
import { TableView } from "./table-view";

const resource = "media_content/news";
const initialSort = { field: "name", order: "ASC" };

export const Create: React.FC<CreateProps> = (props) => {
  return (
    <ResourceCreate {...props} resource={resource}>
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const List: React.FC = (props) => (
  <ResourceList sort={initialSort} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);

export { Icon };
