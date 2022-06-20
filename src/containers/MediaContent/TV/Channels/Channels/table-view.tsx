import * as React from "react";
import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { FunctionField } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";
import {
  ArrowIconDown,
  ArrowIconUp,
  PublishIcon,
  UnPublishIcon,
} from "../../../../../constants/icons";
import { StandardButton } from "../../../../../components/UI/Buttons/StandardButton/standard-button";
import { useTableActions } from "../../../../../custom-hooks/use-table-actions";
import { channelFilter } from "./channel-filter";
import { ToModelField } from "../../../../../components/TableFields/to-model-field";
import { UrlField } from "../../../../../components/TableFields/url-field";
import { PublishedField } from "../../../../../components/TableFields/published-field";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
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
          <UrlField name={record?.name} to={`/${props.resource}/${record?.id}/show`} />
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
        label="Channel versions"
        className={classes.ButtonCell}
        render={(record?: RecordRA) => (
          <ToModelField
            record={record!}
            to={`/${props.resource}`}
            source="channelVersions"
            label="channel versions"
            linkSource="channel_versions"
          />
        )}
      />
      <FunctionField
        label=""
        render={(record?: RecordRA) => (
          <div className={classes.MoreActions}>
            <PublishedField published={record?.published} />
            <MoreActionsButton>
              <StandardButton
                onClick={() =>
                  approve(record?.id, {
                    ...record,
                    published: !record?.published,
                  })
                }
                disabled={loading}
                buttonType="secondary"
                variant="text"
                startIcon={record?.published ? <UnPublishIcon /> : <PublishIcon />}
              >
                {record?.published ? <>Unpublish</> : <>Publish</>}
              </StandardButton>
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: 1 })}
                disabled={loading}
                buttonType="secondary"
                variant="text"
                startIcon={<ArrowIconUp />}
              >
                To the top of the list
              </StandardButton>
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: props.total ?? 0 })}
                startIcon={<ArrowIconDown />}
                disabled={loading}
                variant="text"
                buttonType="secondary"
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
