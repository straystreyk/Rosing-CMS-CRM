import * as React from "react";

import {
  ResourceList,
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
} from "../../../../components/ResourceView";
import { TableView } from "./table-view";
import { Form } from "./form";
import { audioTabs } from "../constants";
import { useRedirect, useRefresh } from "react-admin";
import { useNotify } from "ra-core";
import { CreateProps } from "ra-ui-materialui";
import { RedirectButtonIcon } from "../../../../constants/icons";

const resource = "media_content/audio/audio_shows";
const initialSort = { field: "position", order: "ASC" };

export const List: React.FC = (props) => (
  <ResourceList sort={initialSort} {...props} listTabs={audioTabs} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
export const Create: React.FC<CreateProps> = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccessWithRedirect: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
        messageArgs: { name: data.name },
      });
      redirect("list", `/media_content/audio/audio_shows/${data.id}/parts/create`, data.id, data);
      refresh();
    },
    [notify, props.resource, redirect, refresh]
  );
  return (
    <ResourceCreate
      {...props}
      resource={resource}
      onSuccessWithRedirect={onSuccessWithRedirect}
      redirectButtonIcon={<RedirectButtonIcon color="#fff" />}
      redirectButtonLabel="Save and add parts"
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};
export const Edit: React.FC = (props) => (
  <ResourceEdit redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
