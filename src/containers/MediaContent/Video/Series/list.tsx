import React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { Record as RecordRA } from "ra-core";
import { makeStyles, Tooltip } from "@material-ui/core";

import { ShowProps } from "../../../../types";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { DatagridList } from "../../../../components/DatagridList";
import { Link } from "react-router-dom";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { seriesFilters } from "./series-filter";
import { ToModelField } from "../../../../components/TableFields/to-model-field";

const useStyles = makeStyles(TableFieldsStyles);

export const List: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  return (
    <DatagridList
      filters={seriesFilters}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      rowClick="edit"
      empty={<EmptyTablePage />}
      optimized
      draggable
      {...props}
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
      <TextField source="position" label="Position" />
      <TextField source="slug" label="Slug" />
      <FunctionField
        label="Seasons"
        className={classes.ButtonCell}
        render={(record?: RecordRA) => (
          <ToModelField
            record={record!}
            to="/media_content/video/series"
            source="seasons"
            label="Seasons"
          />
        )}
      />
      <FunctionField
        label=""
        render={(record?: Record) => (
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
