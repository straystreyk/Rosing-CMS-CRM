import * as React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { ShowProps } from "../../../../types";
import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { ReferenceField } from "../../../../components/TableFields/reference-field";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import { ResourceAddIcon, ResourceCountEpisodesIcon } from "../../../../constants/icons";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      {...props}
      empty={<EmptyTablePage />}
      draggable
      optimized
    >
      <FunctionField
        label="Name"
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
      <TextField label="Slug" source="slug" />
      <ReferenceField
        label="External catalog"
        source="media_content/attributes/providers/content_providers"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="datacenters"
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <FunctionField
        label="Parts"
        source="parts"
        render={(record?: Record) => (
          <>
            <StandardButton
              startIcon={
                record?.parts.length ? (
                  <ResourceCountEpisodesIcon color="var(--accent-color)" />
                ) : (
                  <ResourceAddIcon color="var(--accent-color)" />
                )
              }
              variant="text"
              customColor="var(--accent-color)"
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() =>
                history.push(
                  record?.parts.length
                    ? `/media_content/audio/audio_shows/${record?.id}/parts`
                    : `/media_content/audio/audio_shows/${record?.id}/parts/create`
                )
              }
            >
              {record?.parts.length ? `Parts (${record?.parts.length})` : "Add parts"}
            </StandardButton>
          </>
        )}
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
