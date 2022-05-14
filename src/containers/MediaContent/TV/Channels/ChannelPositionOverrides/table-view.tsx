import * as React from "react";
import { TextField } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { ReferenceField } from "../../../../../components/TableFields/reference-field";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      draggable
      optimized
    >
      <ReferenceField
        label="Channel"
        source="channelId"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="media_content/tv/channels/channels"
        linkType={false}
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <TextField source="Name" />
    </DatagridList>
  );
};
