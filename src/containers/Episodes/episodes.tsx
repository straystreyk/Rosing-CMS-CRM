import * as React from "react";
import Icon from "@material-ui/icons/VideoCallRounded";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { useParams } from "react-router-dom";
import { sanytizeId } from "../../helpers/form";
import { ListProps } from "../../types";
import { CreateProps, EditProps } from "ra-ui-materialui";

const resource = "media_content/video/seasons/:seasonId/episodes";
const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC<ListProps> = (props) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  return (
    <ResourceList
      {...props}
      filters={filters}
      basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)}
      permanentFilter={{ seasonId: sanytizeId(seasonId) }}
      resource={resource}
    >
      <Show resource={resource} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  return (
    <ResourceCreate
      {...props}
      resource={resource}
      basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)}
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};
export const Edit: React.FC<EditProps> = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
