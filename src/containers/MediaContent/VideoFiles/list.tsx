import * as React from "react";
import { TextField, Record as RecordRA } from "react-admin";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { DatagridList } from "../../../components/DatagridList";
import { makeStyles } from "@material-ui/core";
import { FunctionField } from "ra-ui-materialui";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";
import { ReferenceField } from "../../../components/TableFields/reference-field";
import { videoFilesFilters } from "./videofiles-filter";

const useStyles = makeStyles({
  MoreInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MoreActionsButtonWrapper": {
      marginLeft: 15,
    },
  },
  NameField: {
    textDecoration: "underline",
    fontSize: 14,
    lineHeight: "20px",
  },
  Empty: {
    color: "var(--secondary-color-default)",
  },
});

export const List: React.FC<{ basePath?: string; resource: string }> = (props) => {
  const classes = useStyles();
  return (
    <DatagridList
      filters={videoFilesFilters}
      empty={<EmptyTablePage />}
      {...props}
      optimized
      rowClick="show"
    >
      <TextField label="Name" source="name" className={classes.NameField} />
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
            <div className={classes.MoreInfo}>
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
