import * as React from "react";
import Icon from "@material-ui/icons/AspectRatio";
import { useNotify } from "ra-core";
import { useRedirect, useRefresh } from "react-admin";
import { List as DataGridList } from "./list";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";
import { ResourceShow } from "../../components/ResourceView/resource-show";
import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { CreateProps } from "ra-ui-materialui";
import { RedirectButtonIcon } from "../../constants/icons";

const resource = "media_content/video/series";

const filters = [<SearchInput source="name" alwaysOn />];

export const List: React.FC = (props) => {
  return (
    <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
      <DataGridList resource={resource} />
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
