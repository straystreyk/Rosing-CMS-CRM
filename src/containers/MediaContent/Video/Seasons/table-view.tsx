import React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { Link, useHistory } from "react-router-dom";
import { Record as RecordRA } from "ra-core/esm/types";
import { makeStyles } from "@material-ui/core/styles";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import {
  PublishedIcons,
  ResourceAddIcon,
  ResourceCountEpisodesIcon,
  UnPublishedIcons,
} from "../../../../constants/icons";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DatagridList } from "../../../../components/DatagridList";
import { ShowProps } from "../../../../types";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { Toolbar } from "./toolbar";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <DatagridList
      toolbar={Toolbar}
      offDescription
      basePath={props.basePath}
      empty={<EmptyTablePage />}
      resource={props.resource}
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
      <TextField label="Slug" source="slug" emptyText="Empty" />
      <TextField label="Number of season" source="number" emptyText="Empty" />
      <FunctionField
        label="Episodes"
        render={(record?: Record) => (
          <>
            <StandardButton
              startIcon={
                record?.episodes.length ? (
                  <ResourceCountEpisodesIcon color="var(--accent-color)" />
                ) : (
                  <ResourceAddIcon color="var(--accent-color)" />
                )
              }
              style={{ paddingLeft: 0, paddingRight: 0 }}
              variant="text"
              customColor="var(--accent-color)"
              onClick={() =>
                history.push(
                  record?.episodes.length
                    ? `/media_content/video/seasons/${record?.id}/episodes`
                    : `/media_content/video/seasons/${record?.id}/episodes/create`
                )
              }
            >
              {record?.episodes.length ? `Episodes (${record?.episodes.length})` : "Add episodes"}
            </StandardButton>
          </>
        )}
      />
      <FunctionField
        label=""
        render={(record?: Record) => (
          <div className={classes.MoreActions}>
            {record?.published ? (
              <button>
                <PublishedIcons />
              </button>
            ) : (
              <button>
                <UnPublishedIcons />
              </button>
            )}
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
