import * as React from "react";
import { FunctionField, TextField } from "react-admin";
import { DatagridList } from "../../components/DatagridList";
import { EmptyTablePage } from "../../components/EmptyTablePage";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../components/TableFields/styles";

const useStyles = makeStyles(TableFieldsStyles);

interface ShowProps {
  resource: string;
}

export const Show: React.FC<ShowProps> = (props) => {
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
    </DatagridList>
  );
};
