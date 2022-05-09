import * as React from "react";

import {
  ResourceEdit,
  ResourceCreate,
  ResourceShow,
  ResourceList,
} from "../../../../../components/ResourceView";
import { Form } from "./form";
import { TableView } from "./table-view";
import { TVTabs } from "../../constants";
import { TVChannelsSubTubs } from "../constants";
import { RedirectButtonIcon } from "../../../../../constants/icons";
import { useNotify } from "ra-core";
import { useRedirect, useRefresh } from "react-admin";
import { CreateProps } from "ra-ui-materialui";

const resource = "media_content/tv/channels/channels";

export const List: React.FC = (props) => (
  <ResourceList listTabs={TVTabs} listSubTabs={TVChannelsSubTubs} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form {...props} resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form {...props} resource={resource} type="show" />
  </ResourceShow>
);
export const Create: React.FC<CreateProps> = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccessWithRedirect: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
        messageArgs: { name: data.name },
      });
      redirect("list", `${props.basePath}/${data.id}/channel_versions`, data.id, data);
      refresh();
    },
    [notify, props.resource, redirect, refresh, props.basePath]
  );

  return (
    <ResourceCreate
      {...props}
      resource={resource}
      redirectButtonIcon={<RedirectButtonIcon color="#fff" />}
      redirectButtonLabel="Save and add channel versions"
      onSuccessWithRedirect={onSuccessWithRedirect}
    >
      <Form {...props} resource={resource} type="create" />
    </ResourceCreate>
  );
};
