import * as React from "react";
import { FunctionField, Record, Record as RecordRA, TextField } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { DatagridList } from "../../../../../components/DatagridList";
import { ShowProps } from "../../../../../types";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { Link } from "react-router-dom";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";

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
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <TextField source="uid" label="UID" />
      <FunctionField
        label="Image"
        offsort
        render={(record?: RecordRA) =>
          record?.images.length ? (
            <span>Has images ({record?.images.length})</span>
          ) : (
            <span className={classes.Empty}>No images</span>
          )
        }
      />
      <FunctionField
        label=""
        render={(record?: Record) => (
          <div className={classes.MoreActions}>
            <MoreActionsButton>
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
