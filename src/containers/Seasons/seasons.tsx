import React from "react";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";

const resource = "seasons";

const filters = [<SearchInput source="name" alwaysOn />];

export const List = (props: React.FC) => (
  <ResourceList {...props} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
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

export { Icon };
