import React from "react";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import Icon from "@material-ui/icons/AspectRatio";
import { List as DataGridList } from "./list";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";
import { ResourceShow } from "../../components/ResourceView/resource-show";

const resource = "media_content/video/series";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC = (props) => (
  <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
    <DataGridList resource={resource} />
  </ResourceList>
);
export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => {
  return (
    <ResourceShow {...props} resource={resource}>
      <Form resource={resource} type="show" />
    </ResourceShow>
  );
};

export { Icon };
