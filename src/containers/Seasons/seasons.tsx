import React from "react";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";
import { Show } from "./show";
import { Form } from "./form";
import { CreateProps, EditProps } from "ra-ui-materialui";
import { ListProps } from "../../types";
import { useParams } from "react-router-dom";
import { SearchInput } from "../../components/Inputs/search-input";

export const resource = "media_content/video/series/:id/seasons";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC<ListProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <ResourceList
      {...props}
      filters={filters}
      permanentFilter={{ seriesId: unescape(id) }}
      resource={resource}
    >
      <Show resource={resource} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => (
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
