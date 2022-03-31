import React from "react";
import { CreateProps, EditProps } from "ra-ui-materialui";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";
import { useParams } from "react-router-dom";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { ListProps } from "../../types";
import { SearchInput } from "../../components/Inputs/search-input";
import { sanytizeId } from "../../helpers/form";

export const resource = "media_content/video/series/:seriesId/seasons";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC<ListProps> = (props) => {
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <ResourceList
      {...props}
      filters={filters}
      basePath={sanytizeId(props.basePath!, /:seriesId/g, seriesId)}
      permanentFilter={{ seriesId: sanytizeId(seriesId) }}
      resource={resource}
      breadCrumbsOn
    >
      <Show resource={resource} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => {
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <ResourceCreate
      {...props}
      offRedirectButton
      basePath={sanytizeId(props.basePath!, /:seriesId/g, seriesId)}
      resource={resource}
    >
      <Form resource={resource} type="create" {...props} />
    </ResourceCreate>
  );
};
export const Edit: React.FC<EditProps> = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
