import * as React from "react";
import Icon from "@material-ui/icons/InsertDriveFile";
import { FC } from "react";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";
import { ResourceShow } from "../../components/ResourceView/resource-show";
import { List as DataGridList } from "./list";

const filters = [<SearchInput source="name" alwaysOn />];
const resource = "media_content/video/video_files";

export const Edit: FC = (props) => (
  <ResourceEdit {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" {...props} />
  </ResourceCreate>
);
export const List: FC = (props) => (
  <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
    <DataGridList resource={resource} />
  </ResourceList>
);

export const Show: FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" {...props} />
  </ResourceShow>
);

export { Icon };
