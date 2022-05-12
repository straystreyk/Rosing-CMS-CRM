import * as React from "react";
import { TextField, Record as RecordRA } from "react-admin";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { FunctionField } from "ra-ui-materialui";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { DatagridList } from "../../../../components/DatagridList";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { ReferenceField } from "../../../../components/TableFields/reference-field";
import { videoFilesFilters } from "./videofiles-filter";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";

const useStyles = makeStyles(TableFieldsStyles);

export const List: React.FC<{ basePath?: string; resource: string }> = (props) => {
  const classes = useStyles();
  return (
    <DatagridList
      filters={videoFilesFilters}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      optimized
      rowClick="show"
    >
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <TextField label="Streaming UID" source="streamingUid" />
      <ReferenceField
        label="Datacenter"
        source="datacenterId"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="datacenters"
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <FunctionField
        label="Allowed drms"
        render={(record?: RecordRA) => `${record?.allowedDrms.join(", ")}`}
      />
      <FunctionField
        label=""
        render={(record?: RecordRA) => {
          return (
            <div className={classes.MoreActions}>
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          );
        }}
      />
    </DatagridList>
  );
};
