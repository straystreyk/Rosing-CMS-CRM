import React from "react";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import Icon from "@material-ui/icons/AspectRatio";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";

const resource = "media_content/video/series";

const filters = [<SearchInput source="name" alwaysOn />];

export const List = (props: React.FC) => (
  <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
export const Create = (props: React.FC) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit = (props: React.FC) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
