import * as React from "react";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../components/ResourceView";
import { Form } from "./form";
import { TableView } from "./table-view";
import { radioTabs } from "../constants";
import { CreateProps } from "ra-ui-materialui";

const resource = "media_content/radio/radio_live_streams";

export const Create: React.FC<CreateProps> = (props) => (
  <ResourceCreate redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const List: React.FC = (props) => (
  <ResourceList {...props} listTabs={radioTabs} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
