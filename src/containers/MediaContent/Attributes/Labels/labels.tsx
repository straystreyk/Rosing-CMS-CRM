import * as React from "react";
import {
  ResourceList,
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
} from "../../../../components/ResourceView";
import { TableView } from "./table-view";
import { Form } from "./form";
import { attributesTabs } from "../constants";

const resource = "media_content/attributes/labels";
const initialSort = { field: "name", order: "ASC" };

export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const List: React.FC = (props) => (
  <ResourceList sort={initialSort} listTabs={attributesTabs} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
