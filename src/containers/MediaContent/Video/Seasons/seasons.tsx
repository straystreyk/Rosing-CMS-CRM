import React from "react";
import { CreateProps, EditProps, ListProps, ShowProps } from "ra-ui-materialui";
import { useParams } from "react-router-dom";

import {
  ResourceList,
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
} from "../../../../components/ResourceView";
import { TableView } from "./table-view";
import { Form } from "./form";
import { sanitizeId } from "../../../../helpers/form";

export const resource = "media_content/video/series/:seriesId/seasons";

type Params = { seriesId: string };

export const List: React.FC<ListProps> = (props) => {
  const { seriesId } = useParams<Params>();

  return (
    <ResourceList
      {...props}
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
      permanentFilter={{ seriesId: sanitizeId(seriesId) }}
      resource={resource}
      breadCrumbsOn
    >
      <TableView resource={resource} basePath={props.basePath} {...props} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => {
  const { seriesId } = useParams<Params>();

  return (
    <ResourceCreate
      {...props}
      offRedirectButton
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
      resource={resource}
    >
      <Form resource={resource} type="create" {...props} />
    </ResourceCreate>
  );
};
export const Edit: React.FC<EditProps> = (props) => {
  const { seriesId } = useParams<Params>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
    >
      <Form resource={resource} type="edit" {...props} />
    </ResourceEdit>
  );
};

export const Show: React.FC<ShowProps> = (props) => {
  const { seriesId } = useParams<Params>();

  return (
    <ResourceShow
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
    >
      <Form resource={resource} type="show" {...props} />
    </ResourceShow>
  );
};
