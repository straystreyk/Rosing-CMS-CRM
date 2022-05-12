import * as React from "react";
import { CreateProps, ListProps } from "ra-ui-materialui";
import Icon from "@material-ui/icons/Movie";

import { Form } from "./form";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../components/ResourceView";
import { List as DataGridList } from "./list";
import { GET_ONE_MOVIE_NAME } from "./custom-requests";
import { videoTabs } from "../constants";

const resource = "media_content/video/movies";
const initialSort = { field: "position", order: "ASC" };

export const Create: React.FC<CreateProps> = (props) => {
  return (
    <ResourceCreate {...props} resource={resource}>
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
    <ResourceList sort={initialSort} {...props} listTabs={videoTabs} resource={resource}>
      <DataGridList resource={resource} basePath={props.basePath} />
    </ResourceList>
  );
};

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);

export { Icon };
