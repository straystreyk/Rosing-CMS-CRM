import * as React from "react";
import Icon from "@material-ui/icons/InsertDriveFile";
import { FC } from "react";

import { ResourceCreate, ResourceEdit, ResourceList } from "../../components/ResourceView";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { mediaContentTabs } from "../../constants/breadcrumbs-link";
import { ResourceShow } from "../../components/ResourceView/resource-show";
import { List as DataGridList } from "./list";
import { SelectInputOrigin } from "../../components/Inputs/StandatdInputs/SelectInput/select-input";
import { searchChoices } from "../../constants/list-constants";
import { makeStyles } from "@material-ui/core";
import { SearchSelect } from "../../components/Inputs/StandatdInputs/SelectInput/styles";

const useStyles = makeStyles({
  SearchSelect,
});

const filters = (selectClass: string) => [
  <SelectInputOrigin
    source="searchRule"
    initialValue="contains"
    allowEmpty={false}
    className={selectClass}
    choices={searchChoices}
    label=""
    alwaysOn
  />,
  <SearchInput placeholder="ID, slug or movie name" label="" source="q" alwaysOn />,
];
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
export const List: FC = (props) => {
  const classes = useStyles();

  return (
    <ResourceList
      {...props}
      listTabs={mediaContentTabs}
      filters={filters(classes.SearchSelect)}
      resource={resource}
    >
      <DataGridList resource={resource} />
    </ResourceList>
  );
};

export const Show: FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" {...props} />
  </ResourceShow>
);

export { Icon };
