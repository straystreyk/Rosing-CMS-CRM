import * as React from "react";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../../components/ResourceView";
import { TableView } from "./table-view";
import { TVTabs } from "../../constants";
import { TVShowsSubTabs } from "../constants";
import { Form } from "./form";

const resource = "media_content/tv/tv_shows/epg_local_events";
const initialSort = { field: "name", order: "ASC" };

export const List: React.FC = (props) => (
  <ResourceList
    sort={initialSort}
    listTabs={TVTabs}
    listSubTabs={TVShowsSubTabs}
    resource={resource}
    {...props}
  >
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
