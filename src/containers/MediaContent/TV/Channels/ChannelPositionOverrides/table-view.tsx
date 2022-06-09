import * as React from "react";
import { FunctionField, NumberField, TextField } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { ReferenceField } from "../../../../../components/TableFields/reference-field";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { Record as RecordRA } from "ra-core/esm/types";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";
import { Link } from "react-router-dom";
import cn from "classnames";

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
        label="id"
        source="id"
        render={(record?: RecordRA) => (
          <Link
            className={cn(classes.NameField, classes.IDField)}
            to={`/${props.resource}/${record?.id}/show`}
          >
            {record?.id}
          </Link>
        )}
      />
      <NumberField label="Position" source="position" />
      <ReferenceField
        label="Channel"
        source="channelId"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="media_content/tv/channels/channels"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
        label=""
        render={(record?: RecordRA) => (
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
