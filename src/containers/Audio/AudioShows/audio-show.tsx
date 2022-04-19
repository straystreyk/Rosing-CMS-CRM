import * as React from "react";
import Icon from "@material-ui/icons/VideoCallRounded";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { audioTabs } from "../constants";

const resource = "media_content/audio/audio_shows";

export const List: React.FC = (props) => (
  <ResourceList {...props} listTabs={audioTabs} resource={resource}>
    <Show resource={resource} />
  </ResourceList>
);
export const Create: React.FC = (props) => (
  <ResourceCreate redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit redirect="show" {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);

export { Icon };
