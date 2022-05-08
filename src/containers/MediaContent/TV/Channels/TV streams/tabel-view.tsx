import * as React from "react";
import { FunctionField, TextField } from "react-admin";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { DatagridList } from "../../../../../components/DatagridList";
import { ShowProps } from "../../../../../types";
import { ReferenceField } from "../../../../../components/TableFields/reference-field";
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
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) =>
          record?.streamingUid ? record?.streamingUid : <span className={classes.Empty}>Empty</span>
        }
      />
      <ReferenceField
        label="Datacenter"
        source="datacenterId"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="datacenters"
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <FunctionField
        label="DRM encryption"
        render={(record?: RecordRA) =>
          record?.allowedDrms ? (
            record?.allowedDrms.join(", ")
          ) : (
            <span className={classes.Empty}>Empty</span>
          )
        }
      />
      <FunctionField
        label=""
        className={classes.MoreActions}
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
