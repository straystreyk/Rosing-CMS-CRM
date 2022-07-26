import * as React from "react";
import { CreateProps, EditProps, ShowProps } from "ra-ui-materialui";
import { useParams } from "react-router-dom";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../components/ResourceView";
import { sanitizeId } from "../../../../helpers/form";
import { Form } from "./form";
import { ResourceComponentProps } from "react-admin";
import { StaticContext } from "react-router";
import { TableView } from "./table-view";

const resource = "media_content/audio/audio_shows/:audioShowId/parts";

export const List: React.FC<ResourceComponentProps<{}, StaticContext, unknown>> = (props) => {
  const { audioShowId } = useParams<{ audioShowId: string }>();

  return (
    <ResourceList
      basePath={sanitizeId(props.basePath!, /:audioShowId/g, audioShowId)}
      permanentFilter={{ audioShowId: sanitizeId(audioShowId) }}
      resource={resource}
      breadCrumbsOn
    >
      <TableView
        resource={resource}
        basePath={sanitizeId(props.basePath!, /:audioShowId/g, audioShowId)}
      />
    </ResourceList>
  );
};

export const Create: React.FC<CreateProps> = (props) => {
  const { audioShowId } = useParams<{ audioShowId: string }>();

  return (
    <ResourceCreate
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:audioShowId/g, audioShowId)}
      offRedirectButton
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};

export const Edit: React.FC<EditProps> = (props) => {
  const { audioShowId } = useParams<{ audioShowId: string }>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:audioShowId/g, audioShowId)}
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
