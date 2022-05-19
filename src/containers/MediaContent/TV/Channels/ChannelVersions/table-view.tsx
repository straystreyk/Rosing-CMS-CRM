import * as React from "react";
import { Identifier, useNotify } from "ra-core";
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
import { ModalMUI } from "../../../../../components/Modal";
import { useModalMUI } from "../../../../../components/Modal/use-modal";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { MainLoader } from "../../../../../components/MainLoader";
import { authClient } from "../../../../../components/Providers";
import { GET_ALL_TV_PROGRAMS } from "./requests";
import { TVProgramsIcon } from "../../../../../constants/icons";

const useStyles = makeStyles({
  ...TableFieldsStyles,
  TVProgram: {
    paddingBottom: 12,
    marginTop: 12,
    borderBottom: "1px solid var(--secondary-color-disable)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface EPG {
  id: Identifier;
  day: string;
  countAll: number;
}

const useTVPrograms: () => {
  loading: boolean;
  data: EPG[] | null;
  getData: (channelVersionId: Identifier | undefined) => void;
} = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<[] | null>(null);
  const notify = useNotify();

  const getData = async (channelVersionId: Identifier | undefined) => {
    try {
      setLoading(true);
      const res = await authClient.query({
        query: GET_ALL_TV_PROGRAMS,
        variables: { channelVersionId },
      });

      const tvPrograms = res.data.data;
      setData(tvPrograms);
    } catch (e) {
      if (e instanceof Error) {
        notify(e.message, { type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getData,
    data,
    loading,
  };
};

const TVProgramItem: React.FC<{ program: EPG }> = ({ program }) => {
  const classes = useStyles();
  return (
    <div className={classes.TVProgram}>
      <div>
        <div>{new Date(program.day).toLocaleDateString()}</div>
        <div>{days[new Date(program.day).getDay()]}</div>
      </div>
      <StandardButton
        startIcon={<TVProgramsIcon color="var(--accent-color)" />}
        variant="text"
        customColor="var(--accent-color)"
      >
        Broadcast ({program.countAll})
      </StandardButton>
    </div>
  );
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { getData, data, loading } = useTVPrograms();
  const { handleOpen, handleClose, open } = useModalMUI();

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
              >
                TV programs
              </StandardButton>
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          )}
        />
      </DatagridList>
      <ModalMUI title="TV programs" open={open} handleClose={handleClose}>
        {loading && (
          <div style={{ display: "flex" }}>
            <MainLoader centered size={50} />
          </div>
        )}
        {data?.length
          ? data.map((program) => {
              return <TVProgramItem program={program} />;
            })
          : null}
        {!loading && !data?.length && <div>No TV programs yet</div>}
      </ModalMUI>
    </>
  );
};
