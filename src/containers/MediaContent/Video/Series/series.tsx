import * as React from "react";
import Icon from "@material-ui/icons/AspectRatio";
import { useNotify } from "ra-core";
import { useRedirect, useRefresh } from "react-admin";
import { List as DataTable } from "./list";
import { Form } from "./form";
import { ResourceShow } from "../../../../components/ResourceView/resource-show";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../../../components/ResourceView";
import { CreateProps } from "ra-ui-materialui";
import { RedirectButtonIcon } from "../../../../constants/icons";
import { videoTabs } from "../constants";

const resource = "media_content/video/series";

export const List: React.FC = (props) => {
  return (
    <ResourceList {...props} listTabs={videoTabs} resource={resource}>
      <DataTable resource={resource} />
    </ResourceList>
  );
};

export const Create: React.FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const refresh = useRefresh();

  const onSuccessWithRedirect: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
        messageArgs: { name: data.name },
      });
      redirect("list", `/media_content/video/series/${data.id}/seasons/create`, data.id, data);
      refresh();
    },
    [notify, props.resource, redirect, refresh]
  );

  return (
    <ResourceCreate
      redirectButtonIcon={<RedirectButtonIcon color="#fff" />}
      redirectButtonLabel="Save and add seasons"
      onSuccessWithRedirect={onSuccessWithRedirect}
      {...props}
      resource={resource}
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};

export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export const Show: React.FC = (props) => {
  return (
    <ResourceShow {...props} resource={resource}>
      <Form resource={resource} type="show" />
    </ResourceShow>
  );
};

export { Icon };
