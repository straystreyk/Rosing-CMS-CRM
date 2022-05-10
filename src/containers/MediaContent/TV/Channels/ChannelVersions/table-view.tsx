import * as React from "react";
import { TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { ReferenceField } from "../../../../../components/TableFields/reference-field";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      optimized
    >
      <TextField source="name" label="Name" />
      <ReferenceField
        label="TV streams"
        source="streamSourceIds"
        reference="media_content/tv/channels/live_streams"
        emptyText={<span className={classes.Empty}>Empty</span>}
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
    </DatagridList>
  );
};
