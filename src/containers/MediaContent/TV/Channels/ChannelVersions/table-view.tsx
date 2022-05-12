import * as React from "react";
import { FunctionField, TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { ReferenceField } from "../../../../../components/TableFields/reference-field";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";
import { Link } from "react-router-dom";

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
        source="name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`${props.basePath}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <ReferenceField
        label="TV streams"
        source="streamSourceIds"
        reference="media_content/tv/channels/live_streams"
        emptyText={<span className={classes.Empty}>Empty</span>}
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <ReferenceField
        label="EPG source"
        source="epgSourceId"
        reference="media_content/tv/tv_shows/epg_sources"
        emptyText={<span className={classes.Empty}>Empty</span>}
      >
        <TextField source="url" fullWidth />
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
