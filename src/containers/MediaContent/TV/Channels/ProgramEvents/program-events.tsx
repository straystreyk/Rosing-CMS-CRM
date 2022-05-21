import * as React from "react";
import { ResourceEdit, ResourceList, ResourceShow } from "../../../../../components/ResourceView";
import { sanitizeId } from "../../../../../helpers/form";
import { TableView } from "./table-view";
import { Form } from "./form";
import { EditProps, ListProps, ShowProps } from "ra-ui-materialui";
import { useParams } from "react-router-dom";

const resource =
  "media_content/tv/channels/channel_versions/:channelVersionId/:epgSourceId/:startAt/program_events";

export const List: React.FC<ListProps> = (props) => {
  const { channelVersionId, epgSourceId, startAt } =
    useParams<{ channelVersionId: string; epgSourceId: string; startAt: string }>();

  return (
    <ResourceList
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelVersionId/g, channelVersionId)}
      permanentFilter={{ epgSourceId: sanitizeId(epgSourceId), startAt }}
      breadCrumbsOn
    >
      <TableView resource={resource} />
    </ResourceList>
  );
};

export const Edit: React.FC<EditProps> = (props) => {
  const { channelVersionId } = useParams<{ channelVersionId: string }>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelVersionId/g, channelVersionId)}
    >
      <Form resource={resource} type="edit" />
    </ResourceEdit>
  );
};

export const Show: React.FC<ShowProps> = (props) => {
  const { channelVersionId } = useParams<{ channelVersionId: string }>();

  return (
    <ResourceShow
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:channelVersionId/g, channelVersionId)}
    >
      <Form resource={resource} type="show" />
    </ResourceShow>
  );
};
