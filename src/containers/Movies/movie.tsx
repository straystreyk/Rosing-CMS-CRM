import * as React from "react";
import Icon from "@material-ui/icons/Movie";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { List as DataGridList } from "./list";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";
import { ResourceShow } from "../../components/ResourceView/resource-show";
import { useRedirect, useRefresh } from "react-admin";
import { useNotify } from "ra-core";
import { CreateProps } from "ra-ui-materialui";

const resource = "media_content/video/movies";
const filters = [<SearchInput source="name" alwaysOn />];

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
      redirect("list", `${props.basePath}/create`, data.id, data);
      refresh();
    },
    [notify, props.basePath, props.resource, redirect, refresh]
  );

  return (
    <ResourceCreate {...props} resource={resource} onSuccessWithRedirect={onSuccessWithRedirect}>
      <Form resource={resource} type="create" {...props} />
    </ResourceCreate>
  );
};
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const List: React.FC = (props) => (
  <ResourceList {...props} listTabs={mediaContentTabs} filters={filters} resource={resource}>
    <DataGridList resource={resource} />
  </ResourceList>
);

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);

export { Icon };
