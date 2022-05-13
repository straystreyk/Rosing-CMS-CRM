import * as React from "react";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../../components/ResourceView";
import { TableView } from "./table-view";
import { Form } from "./form";
import { attributesTabs } from "../../constants";
import { providersSubTabs } from "../constants";

const resource = "media_content/attributes/providers/content_providers";
const initialSort = { field: "name", order: "ASC" };

export const List: React.FC = (props) => (
  <ResourceList
    listSubTabs={providersSubTabs}
    listTabs={attributesTabs}
    sort={initialSort}
    {...props}
    resource={resource}
  >
    <TableView resource={resource} />
  </ResourceList>
);

export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form type="edit" resource={resource} />
  </ResourceEdit>
);

export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form type="create" resource={resource} />
  </ResourceCreate>
);

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form type="show" resource={resource} />
  </ResourceShow>
);
