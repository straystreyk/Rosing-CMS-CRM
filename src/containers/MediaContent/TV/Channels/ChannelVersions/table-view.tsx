import * as React from "react";
import { Identifier } from "ra-core";
import { FunctionField, SingleFieldList, TextField } from "react-admin";
import { Link } from "react-router-dom";

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
import { ReferenceArrayField } from "../../../../../components/TableFields/reference-array-field";
import { useModalMUI } from "../../../../../components/Modal/use-modal";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { TVProgramsIcon } from "../../../../../constants/icons";
import { ModalTVPrograms, useTVPrograms } from "./tv-programs";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { getData, data, loading } = useTVPrograms();
  const { handleOpen, open, handleClose } = useModalMUI();

  const openTVPrograms = React.useCallback(
    (channelVersionId: Identifier | undefined) => {
      handleOpen();
      getData(channelVersionId);
    },
    [getData, handleOpen]
  );

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
        <ReferenceArrayField
          label="TV streams"
          source="streamSourceIds"
          reference="media_content/tv/channels/live_streams"
          emptyText={<span className={classes.Empty}>Empty</span>}
          offsort
        >
          <SingleFieldList linkType={false} component="span">
            <TextField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceField
          label="EPG source"
          source="epgSourceId"
          reference="media_content/tv/tv_shows/epg_sources"
          emptyText={<span className={classes.Empty}>Empty</span>}
        >
          <TextField source="name" fullWidth />
        </ReferenceField>
        <FunctionField
          label=""
          render={(record?: RecordRA) => (
            <div className={classes.MoreActions}>
              <StandardButton
                customColor="var(--accent-color)"
                startIcon={<TVProgramsIcon color="var(--accent-color)" />}
                onClick={() => openTVPrograms(record?.id)}
                variant="text"
                text="TV programs"
              />
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          )}
        />
      </DatagridList>
      <ModalTVPrograms
        title="TV Programs"
        description="List of dates with available events"
        open={open}
        handleClose={handleClose}
        loading={loading}
        data={data}
      />
    </>
  );
};
