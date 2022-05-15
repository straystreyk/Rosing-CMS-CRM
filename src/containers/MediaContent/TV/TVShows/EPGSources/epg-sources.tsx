import * as React from "react";
import { ResourceList } from "../../../../../components/ResourceView";
import { TVTabs } from "../../constants";
import { TableView } from "./table-view";
import { TVShowsSubTabs } from "../constants";

const resource = "media_content/tv/tv_shows/epg_sources";

export const List: React.FC = (props) => (
  <ResourceList listTabs={TVTabs} listSubTabs={TVShowsSubTabs} {...props} resource={resource}>
    <TableView resource={resource} />
  </ResourceList>
);
