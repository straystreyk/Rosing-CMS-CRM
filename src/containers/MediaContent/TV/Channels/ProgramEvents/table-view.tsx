import * as React from "react";
import { FunctionField } from "react-admin";
import { Link } from "react-router-dom";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <DatagridList
        {...props}
        listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
        empty={<EmptyTablePage />}
        optimized
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
      </DatagridList>
    </>
  );
};
