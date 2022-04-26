import * as React from "react";
import Icon from "@material-ui/icons/VideoCallRounded";

import {
  ResourceList,
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
} from "../../../../components/ResourceView";
import { TableView } from "./table-view";
import { Form } from "./form";
import { radioTabs } from "../../constants";

const resource = "media_content/radio/radio_stations";

export const List: React.FC = (props) => (
  <ResourceList {...props} listTabs={radioTabs} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const Create: React.FC = (props) => (
  <ResourceCreate redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
