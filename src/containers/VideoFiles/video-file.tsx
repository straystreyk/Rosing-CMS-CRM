import * as React from "react";
import Icon from "@material-ui/icons/InsertDriveFile";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { Show } from "./show";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";

const resource = "media_content/video_files";

const filters = [<SearchInput source="name" alwaysOn />];

export const Create = (props: React.FC) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceCreate>
);
export const Edit = (props: React.FC) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceEdit>
);
export const List = (props: React.FC) => (
  <ResourceList {...props} listTabs={mediaContentTabs} resource={resource} filters={filters}>
    <Show />
  </ResourceList>
);

export { Icon };
