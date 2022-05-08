import * as React from "react";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../../components/ResourceView";
import { TableView } from "./tabel-view";
import { TVTabs } from "../../constants";
import { TVChannelsSubTubs } from "../constants";
import { Form } from "./form";

const resource = "media_content/tv/channels/live_streams";

export const List: React.FC = (props) => (
  <ResourceList listTabs={TVTabs} listSubTabs={TVChannelsSubTubs} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" {...props} />
  </ResourceShow>
);
export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" {...props} />
  </ResourceCreate>
);
