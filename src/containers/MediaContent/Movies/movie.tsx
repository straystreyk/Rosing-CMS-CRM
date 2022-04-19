import * as React from "react";
import { useRedirect, useRefresh } from "react-admin";
import { useNotify } from "ra-core";
import { CreateProps, ListProps } from "ra-ui-materialui";
import Icon from "@material-ui/icons/Movie";

import { Form } from "./form";
import { ResourceCreate, ResourceEdit, ResourceList } from "../../../components/ResourceView";
import { List as DataGridList } from "./list";
import { ResourceShow } from "../../../components/ResourceView/resource-show";
import { GET_ONE_MOVIE_NAME } from "./custom-requests";
import { mediaContentTabs } from "../constants";

const resource = "media_content/video/movies";

const SCROLL_TO_OPTS: ScrollToOptions = {
  behavior: "smooth",
  top: 0,
};

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
      window.scrollTo(SCROLL_TO_OPTS);
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
  <ResourceEdit query={GET_ONE_MOVIE_NAME} {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const List: React.FC<ListProps> = (props) => {
  return (
    <ResourceList {...props} listTabs={mediaContentTabs} resource={resource}>
      <DataGridList resource={resource} />
    </ResourceList>
  );
};

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);

export { Icon };
