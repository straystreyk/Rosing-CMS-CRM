import React from "react";
import { CreateProps, EditProps } from "ra-ui-materialui";
import { useListContext } from "react-admin";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { ListProps } from "../../types";
import { SearchInput } from "../../components/Inputs/search-input";

export const resource = "media_content/video/series/:id/seasons";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC<ListProps> = (props) => {
  return (
    <ResourceList
      {...props}
      filters={filters}
      breadCrumbs
      permanentFilter={props.id ? { seriesId: unescape(props.id) } : {}}
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
