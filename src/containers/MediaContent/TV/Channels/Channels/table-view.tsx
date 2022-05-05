import * as React from "react";
import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { FunctionField } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList empty={<EmptyTablePage />} {...props} optimized draggable>
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <FunctionField
        label="Position"
        source="position"
        render={(record?: RecordRA) => record?.position ?? "Not filled in"}
      />
    </DatagridList>
  );
};
