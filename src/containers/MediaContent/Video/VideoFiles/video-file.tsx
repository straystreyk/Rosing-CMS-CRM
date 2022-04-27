import * as React from "react";
import Icon from "@material-ui/icons/InsertDriveFile";
import { FC } from "react";

import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../components/ResourceView";
import { Form } from "./form";
import { List as DataGridList } from "./list";
import { ListProps } from "ra-ui-materialui";
import { videoTabs } from "../constants";

const resource = "media_content/video/video_files";

export const Edit: FC = (props) => (
  <ResourceEdit {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" {...props} />
  </ResourceCreate>
);
export const List: FC<ListProps> = (props) => {
  return (
    <ResourceList {...props} listTabs={videoTabs} resource={resource}>
      <DataGridList resource={resource} basePath={props.basePath} />
    </ResourceList>
  );
};

export const Show: FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" {...props} />
  </ResourceShow>
);

export { Icon };
