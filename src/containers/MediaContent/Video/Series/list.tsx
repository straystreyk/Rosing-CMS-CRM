import React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { Record as RecordRA } from "ra-core";
import { makeStyles } from "@material-ui/core";

import { ShowProps } from "../../../../types";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { DatagridList } from "../../../../components/DatagridList";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import { ResourceAddIcon, ResourceCountEpisodesIcon } from "../../../../constants/icons";
import { Link, useHistory } from "react-router-dom";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { seriesFilters } from "./series-filter";

const useStyles = makeStyles(TableFieldsStyles);

export const List: React.FC<ShowProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <DatagridList
      filters={seriesFilters}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      rowClick="edit"
      empty={<EmptyTablePage />}
      optimized
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
        source="seasons"
        render={(record?: Record) => (
          <>
            <StandardButton
              startIcon={
                record?.seasons.length ? (
                  <ResourceCountEpisodesIcon color="var(--accent-color)" />
                ) : (
                  <ResourceAddIcon color="var(--accent-color)" />
                )
              }
              variant="text"
              customColor="var(--accent-color)"
              style={{ padding: 0 }}
              onClick={() =>
                history.push(
                  record?.seasons.length
                    ? `/media_content/video/series/${record?.id}/seasons`
                    : `/media_content/video/series/${record?.id}/seasons/create`
                )
              }
            >
              {record?.seasons.length ? `Seasons (${record?.seasons.length})` : "Add seasons"}
            </StandardButton>
          </>
        )}
      />
      <FunctionField
        label=""
        className={classes.MoreActions}
        render={(record?: Record) => (
          <MoreActionsButton>
            <EditButton color="secondary" record={record} basePath={props.basePath} />
            <DeleteButton record={record} basePath={props.basePath} />
          </MoreActionsButton>
        )}
      />
    </DatagridList>
  );
};
