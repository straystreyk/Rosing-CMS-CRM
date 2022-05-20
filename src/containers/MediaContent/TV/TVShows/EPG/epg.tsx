import * as React from "react";
import { ResourceList } from "../../../../../components/ResourceView";
import { TableView } from "./table-view";
import { TVTabs } from "../../constants";
import { TVShowsSubTabs } from "../constants";

const resource = "media_content/tv/tv_shows/tv_programs";

export const List: React.FC = (props) => (
  <ResourceList listTabs={TVTabs} listSubTabs={TVShowsSubTabs} resource={resource} {...props}>
    <TableView resource={resource} />
  </ResourceList>
);
