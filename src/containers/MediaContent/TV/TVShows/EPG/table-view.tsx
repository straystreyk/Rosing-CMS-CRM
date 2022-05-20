import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      offActions
      optimized
      {...props}
    >
      <TextField label="Channel name" source="channelName" fullWidth />
      <TextField label="Сhannel version" source="channelVersionName" fullWidth />
      <TextField label="EPG source" source="epgSourceName" fullWidth />
    </DatagridList>
  );
};
