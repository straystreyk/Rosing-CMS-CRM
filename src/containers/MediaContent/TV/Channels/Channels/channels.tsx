import * as React from "react";

import {
  ResourceEdit,
  ResourceCreate,
  ResourceShow,
  ResourceList,
} from "../../../../../components/ResourceView";
import { Form } from "./form";
import { TableView } from "./table-view";
import { TVTabs } from "../../constants";
import { TVChannelsSubTubs } from "../constants";
import { RedirectButtonIcon } from "../../../../../constants/icons";

const resource = "media_content/tv/channels/channels";

export const List: React.FC = (props) => (
  <ResourceList listTabs={TVTabs} listSubTabs={TVChannelsSubTubs} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form {...props} resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form {...props} resource={resource} type="show" />
  </ResourceShow>
);
export const Create: React.FC = (props) => (
  <ResourceCreate
    {...props}
    resource={resource}
    redirectButtonIcon={<RedirectButtonIcon color="#fff" />}
    redirectButtonLabel="Save and add channel versions"
  >
    <Form {...props} resource={resource} type="create" />
  </ResourceCreate>
);
