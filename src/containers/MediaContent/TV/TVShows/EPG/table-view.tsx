import * as React from "react";
import * as _ from "lodash";

import { makeStyles } from "@material-ui/core";

import { FunctionField, TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { Record as RecordRA } from "ra-core/esm/types";
import { UrlField } from "../../../../../components/TableFields/url-field";
import { EPG } from "../../Channels/ChannelVersions/tv-programs";
import { EPGTableStyles } from "./styles";

const useStyles = makeStyles(EPGTableStyles);

const Empty = () => <></>;

let data: EPG[] = [];

const useTableTvDates = () => {
  const [sortedData, setSortedData] = React.useState<Record<string, EPG[]>>({});

  React.useEffect(() => {
    if (data.length) {
      const allDates = [].concat(...(data as []));
      setSortedData(_.groupBy(allDates, "day"));
    }
  }, [data]);

  return {
    sortedData,
  };
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { sortedData } = useTableTvDates();

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
          label="Channel"
          render={(record?: RecordRA) => {
            if (!data.includes(record?.tvPrograms)) data = [...data, record?.tvPrograms];
            return (
              <UrlField
                name={record?.channelName}
                to={`/media_content/tv/channels/channels/${record?.channelId}/show`}
              />
            );
          }}
        />
        <FunctionField
          label="Channel version"
          render={(record?: RecordRA) => (
            <UrlField
              name={record?.channelVersionName}
              to={`/media_content/tv/channels/channels/${record?.channelId}/channel_versions/${record?.channelVersionId}/show`}
            />
          )}
        />
        <TextField label="EPG source" source="epgSourceName" />
        {sortedData && sortedData.length ? (
          Object.keys(sortedData).map((date) => {
            return (
              <FunctionField
                label={new Date(date).toLocaleDateString()}
                key={date}
                offsort
                render={(record?: RecordRA) => {
                  const current = sortedData[date].filter(
                    (el) => el.channelVersionId === record?.channelVersionId
                  )[0];
                  return (
                    <>
                      {!!current ? (
                        <UrlField
                          name={current.countAll}
                          className={classes.TvProgramExist}
                          to={`/media_content/tv/channels/channel_versions/${current.channelVersionId}/${current.epgSourceId}/${current.day}/program_events`}
                        />
                      ) : (
                        <span className={classes.EmptyTvProgram}>0</span>
                      )}
                    </>
                  );
                }}
              />
            );
          })
        ) : (
          <></>
        )}
      </DatagridList>
    </>
  );
};
