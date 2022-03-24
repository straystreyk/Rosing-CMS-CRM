import React from "react";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { CreateProps, EditProps } from "ra-ui-materialui";
import { ListProps } from "../../types";

interface ResourceCreateProps extends CreateProps {
  id?: string;
}

const resource = "media_content/video/seasons";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC<ListProps> = (props) => (
  <ResourceList {...props} filters={filters} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
export const Create: React.FC<ResourceCreateProps> = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" {...props} />
  </ResourceCreate>
);
export const Edit: React.FC<EditProps> = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
