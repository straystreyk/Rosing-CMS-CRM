import * as React from "react";
import {
  ResourceCreate,
  ResourceEdit,
  ResourceShow,
} from "../../../../../../components/ResourceView";
import { Form } from "./form";

const resource = "media_content/tv/tv_shows/epg_sources";

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
export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form {...props} resource={resource} type="create" />
  </ResourceCreate>
);
