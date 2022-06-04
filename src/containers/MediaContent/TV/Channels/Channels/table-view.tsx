import * as React from "react";
import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { FunctionField, Record } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link, useHistory } from "react-router-dom";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";
import {
  ArrowIconDown,
  ArrowIconUp,
  PublishedIcons,
  PublishIcon,
  ResourceAddIcon,
  ResourceCountEpisodesIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../../../../constants/icons";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { useTableActions } from "../../../../../custom-hooks/use-table-actions";
import { channelFilter } from "./channel-filter";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, approve } = useTableActions(props);

  return (
    <DatagridList
      filters={channelFilter}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      optimized
      draggable
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
      <FunctionField
        label="Position"
        source="position"
        render={(record?: RecordRA) =>
          record?.position ?? <span className={classes.Empty}>Empty</span>
        }
      />
      <FunctionField
        label="Catch-up"
        source="catchupAvailabilityValue"
        render={(record?: RecordRA) =>
          record?.catchupAvailabilityValue ? (
            <span>
              {record?.catchupAvailabilityValue} {record?.catchupAvailabilityUnit}
            </span>
          ) : (
            <span className={classes.Empty}>Empty</span>
          )
        }
      />
      <FunctionField
        label="Time-shift"
        source="timeshiftAvailabilityValue"
        render={(record?: RecordRA) =>
          record?.timeshiftAvailabilityValue ? (
            <span>
              {record?.timeshiftAvailabilityValue} {record?.timeshiftAvailabilityUnit}
            </span>
          ) : (
            <span className={classes.Empty}>Empty</span>
          )
        }
      />
      <FunctionField
        label=""
        source=""
        render={(record?: Record) => (
          <>
            <StandardButton
              onClick={() =>
                record?.channelVersions && record?.channelVersions.length
                  ? history.push(`/${props.resource}/${record?.id}/channel_versions`)
                  : history.push(`/${props.resource}/${record?.id}/channel_versions/create`)
              }
              startIcon={
                record?.channelVersions && record?.channelVersions.length ? (
                  <ResourceCountEpisodesIcon color="var(--accent-color)" />
                ) : (
                  <ResourceAddIcon color="var(--accent-color)" />
                )
              }
              variant="text"
              customColor="var(--accent-color)"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              {record?.channelVersions && record?.channelVersions.length
                ? `Versions (${record?.channelVersions.length})`
                : "Add versions"}
            </StandardButton>
          </>
        )}
      />
      <FunctionField
        label=""
        render={(record?: RecordRA) => (
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
              <StandardButton
                onClick={() =>
                  approve(record?.id, {
                    ...record,
                    published: !record?.published,
                  })
                }
                disabled={loading}
                color="secondary"
                variant="textWithBg"
                startIcon={record?.published ? <UnPublishIcon /> : <PublishIcon />}
              >
                {record?.published ? <>Unpublish</> : <>Publish</>}
              </StandardButton>
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: 1 })}
                disabled={loading}
                color="secondary"
                variant="textWithBg"
                startIcon={<ArrowIconUp />}
              >
                To the top of the list
              </StandardButton>
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: props.total ?? 0 })}
                startIcon={<ArrowIconDown />}
                disabled={loading}
                variant="textWithBg"
                color="secondary"
              >
                To the bottom of the list
              </StandardButton>
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
