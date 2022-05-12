import * as React from "react";
import {
  ResourceEdit,
  ResourceList,
  ResourceCreate,
  ResourceShow,
} from "../../../../../components/ResourceView";
import { sanitizeId } from "../../../../../helpers/form";
import { TableView } from "./table-view";
import { Form } from "./form";
import { CreateProps, EditProps, ListProps, ShowProps } from "ra-ui-materialui";
import { useParams } from "react-router-dom";

const resource = "media_content/tv/channels/channels/:channelId/channel_versions";

export const List: React.FC<ListProps> = (props) => {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <ResourceList
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelId/g, channelId)}
      permanentFilter={{ channelId: sanitizeId(channelId) }}
      breadCrumbsOn
    >
      <TableView resource={resource} />
    </ResourceList>
  );
};

export const Edit: React.FC<EditProps> = (props) => {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelId/g, channelId)}
    >
      <Form resource={resource} type="edit" />
    </ResourceEdit>
  );
};

export const Show: React.FC<ShowProps> = (props) => {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <ResourceShow
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelId/g, channelId)}
    >
      <Form resource={resource} type="show" />
    </ResourceShow>
  );
};

export const Create: React.FC<CreateProps> = (props) => {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <ResourceCreate
      {...props}
      resource={resource}
      offRedirectButton
      basePath={sanitizeId(props.basePath!, /:channelId/g, channelId)}
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};
