import { FC } from "react";
import Icon from "@material-ui/icons/Announcement";

import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../components/ResourceView";

import { Form } from "./form";
import { TableView } from "./table-view";

const resource = "media_content/news";

export const Create: FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const List: FC = (props) => (
  <ResourceList {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);

export { Icon };
