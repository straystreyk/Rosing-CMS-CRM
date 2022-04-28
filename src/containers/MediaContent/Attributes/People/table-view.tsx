import * as React from "react";
import { FunctionField, TextField } from "react-admin";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";

import { ShowProps } from "../../../../types";
import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      {...props}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      optimized
    >
      <FunctionField
        label="Name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.fullName}
          </Link>
        )}
      />
      <FunctionField
        label="Image"
        render={(record?: RecordRA) =>
          record?.images.length ? (
            <span>Has avatar</span>
          ) : (
            <span className={classes.Empty}>No avatar</span>
          )
        }
      />
      <FunctionField
        label=""
        render={(record?: RecordRA) => (
          <MoreActionsButton>
            <EditButton color="secondary" record={record} basePath={props.basePath} />
            <DeleteButton record={record} basePath={props.basePath} />
          </MoreActionsButton>
        )}
      />
    </DatagridList>
  );
};
