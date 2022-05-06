import * as React from "react";
import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { FunctionField, TextField } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";

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
      <FunctionField
        label="Catch-up"
        source="catchupAvailabilityValue"
        render={(record?: RecordRA) =>
          record?.catchupAvailabilityValue ? (
            <span>
              {record?.catchupAvailabilityValue} {record?.catchupAvailabilityUnit}
            </span>
          ) : (
            "Not filled in"
          )
        }
      />
      <FunctionField
        label="Time-shift"
        source="timeshiftAvailabilityValue"
        render={(record?: RecordRA) =>
          record?.timeshiftAvailabilityValue ? (
            <span>
              {record?.timeshiftAvailabilityValue} {record?.timeshiftAvailabilityUnit}
            </span>
          ) : (
            "Not filled in"
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
