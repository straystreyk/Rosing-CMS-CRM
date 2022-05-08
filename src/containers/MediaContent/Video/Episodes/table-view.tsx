import * as React from "react";
import { FunctionField, Record, Record as RecordRA, TextField } from "react-admin";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { DatagridList } from "../../../../components/DatagridList";
import { ShowProps } from "../../../../types";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { Toolbar } from "../Seasons/toolbar";
import { PublishedIcons, UnPublishedIcons } from "../../../../constants/icons";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <DatagridList
        {...props}
        optimized
        toolbar={Toolbar}
        offDescription
        basePath={props.basePath}
        empty={<EmptyTablePage />}
      >
        <FunctionField
          label="Name"
          source="name"
          render={(record?: RecordRA) => (
            <Link className={classes.NameField} to={`${props.basePath}/${record?.id}/show`}>
              {record?.name}
            </Link>
          )}
        />
        <TextField label="Slug" source="slug" emptyText="Empty" />
        <TextField source="number" label="Number of episode" />
        <FunctionField
          label=""
          render={(record?: Record) => (
            <div className={classes.MoreActions}>
              {record?.published ? (
                <button>
                  <PublishedIcons />
                </button>
              ) : (
                <button>
                  <UnPublishedIcons />
                </button>
              )}
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          )}
        />
      </DatagridList>
    </>
  );
};
