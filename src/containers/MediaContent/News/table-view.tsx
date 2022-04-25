import * as React from "react";
import { FunctionField, TextField } from "react-admin";
import { DatagridList } from "../../../components/DatagridList";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../components/TableFields/styles";
import { ShowProps } from "../../../types";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  return (
    <DatagridList empty={<EmptyTablePage />} {...props} optimized>
      <FunctionField
        label="Name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <TextField label="Slug" source="slug" />
      <FunctionField
        label="Image"
        render={(record?: RecordRA) =>
          record?.images.length ? (
            <span>Has images ({record?.images.length})</span>
          ) : (
            <span className={classes.Empty}>No images</span>
          )
        }
      />
    </DatagridList>
  );
};
