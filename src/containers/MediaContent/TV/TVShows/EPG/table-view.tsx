import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { FunctionField, TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { ModalTVPrograms, useTVPrograms } from "../../Channels/ChannelVersions/tv-programs";
import { useModalMUI } from "../../../../../components/Modal/use-modal";
import { Identifier } from "ra-core";
import { Record as RecordRA } from "ra-core/esm/types";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { TVProgramsIcon } from "../../../../../constants/icons";

const useStyles = makeStyles({
  ...TableFieldsStyles,
  DatagridTVPrograms: {
    "& tbody tr th:first-child": {
      paddingLeft: 24,
    },
    "& thead tr th:first-child": {
      paddingLeft: 24,
    },
  },
});

const Empty = () => <></>;

export const TableView: React.FC<ShowProps> = (props) => {
  const { getData, data, loading, setData } = useTVPrograms();
  const classes = useStyles();

  const closeModal = () => {
    setTimeout(() => setData(null), 350);
  };

  const { handleOpen, open, handleClose } = useModalMUI(undefined, closeModal);

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
        listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
        empty={<EmptyTablePage />}
        toolbar={Empty}
        offActions
        optimized
        offRowToggle
        datagridWrapperClassName={classes.DatagridTVPrograms}
        {...props}
      >
        <TextField label="Сhannel name" source="channelName" />
        <TextField label="Сhannel version" source="channelVersionName" />
        <TextField label="EPG source" source="epgSourceName" />
        <FunctionField
          label=""
          render={(record?: RecordRA) => (
            <div className={classes.MoreActions}>
              <StandardButton
                customColor="var(--accent-color)"
                startIcon={<TVProgramsIcon color="var(--accent-color)" />}
                onClick={() => openTVPrograms(record?.id)}
                variant="text"
              >
                TV programs
              </StandardButton>
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
