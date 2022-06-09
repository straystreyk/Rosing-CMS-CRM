import * as React from "react";
import * as _ from "lodash";

import { makeStyles } from "@material-ui/core";

import { FunctionField, TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { Record as RecordRA } from "ra-core/esm/types";
import { UrlField } from "../../../../../components/TableFields/url-field";
import { Identifier } from "ra-core";
import { EPG, ModalTVPrograms } from "../../Channels/ChannelVersions/tv-programs";
// import { useTVPrograms } from "../../Channels/ChannelVersions/tv-programs";
// import { useModalMUI } from "../../../../../components/Modal/use-modal";
// import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
// import { TVProgramsIcon } from "../../../../../constants/icons";

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

// const { getData, data, loading, setData } = useTVPrograms();
//
// const closeModal = () => {
//   setTimeout(() => setData(null), 350);
// };
//
// const { handleOpen, open, handleClose } = useModalMUI(undefined, closeModal);
//
// const openTVPrograms = React.useCallback(
//   (channelVersionId: Identifier | undefined) => {
//     handleOpen();
//     getData(channelVersionId);
//   },
//   [getData, handleOpen]
// );

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState<EPG[]>([]);
  const [sortedData, setSortedData] = React.useState<Record<string, EPG[]>>({});

  React.useEffect(() => {
    if (data.length) {
      const s = [].concat(...(data as []));
      setSortedData(_.groupBy(s, "day"));
    }
  }, [data]);

  return (
    <>
      <DatagridList
        listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
        datagridWrapperClassName={classes.DatagridTVPrograms}
        empty={<EmptyTablePage />}
        toolbar={Empty}
        offActions
        optimized
        offRowToggle
        {...props}
      >
        <FunctionField
          label="Channel name"
          render={(record?: RecordRA) => {
            if (!data.includes(record?.tvPrograms)) setData((p) => [...p, record?.tvPrograms]);
            return (
              <UrlField
                name={record?.channelName}
                to={`/media_content/tv/channels/channels/${record?.channelId}/show`}
              />
            );
          }}
        />
        <FunctionField
          label="Channel version name"
          render={(record?: RecordRA) => (
            <UrlField
              name={record?.channelVersionName}
              to={`/media_content/tv/channels/channels/${record?.channelId}/channel_versions/${record?.channelVersionId}/show`}
            />
          )}
        />
        <TextField label="EPG source" source="epgSourceName" />
        {sortedData &&
          Object.keys(sortedData).map((date) => {
            return (
              <FunctionField
                label={new Date(date).toLocaleDateString()}
                offsort
                render={(record?: RecordRA) => {
                  const current = sortedData[date].filter(
                    (el) => el.channelVersionId === record?.channelVersionId
                  )[0];
                  return <span>{!!current ? current.countAll : 0}</span>;
                }}
              />
            );
          })}
      </DatagridList>
      {/*<ModalTVPrograms*/}
      {/*  title="TV Programs"*/}
      {/*  description="List of dates with available events"*/}
      {/*  open={open}*/}
      {/*  handleClose={handleClose}*/}
      {/*  loading={loading}*/}
      {/*  data={data}*/}
      {/*/>*/}
    </>
  );
};
