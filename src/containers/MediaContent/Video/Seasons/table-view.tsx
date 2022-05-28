import React from "react";
import { FunctionField, Record } from "react-admin";
import { Link, useHistory } from "react-router-dom";
import { Record as RecordRA } from "ra-core/esm/types";
import { makeStyles } from "@material-ui/core/styles";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import {
  PublishedIcons,
  PublishIcon,
  ResourceAddIcon,
  ResourceCountEpisodesIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../../../constants/icons";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DatagridList } from "../../../../components/DatagridList";
import { ShowProps } from "../../../../types";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { useTableActions } from "../../../../custom-hooks/use-table-actions";
import { ExpandWrapper } from "../../../../components/DatagridList/expand-wrapper";
import { Toolbar } from "./toolbar";
import { Form } from "./form";

const useStyles = makeStyles(TableFieldsStyles);

const SeasonExpand: React.FC<{ resource: string }> = ({ resource, ...props }) => {
  return (
    <ExpandWrapper>
      <Form resource={resource} type="show" />
    </ExpandWrapper>
  );
};

export const TableView: React.FC<ShowProps> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { loading, approve } = useTableActions(props);

  return (
    <DatagridList
      toolbar={Toolbar}
      basePath={props.basePath}
      empty={<EmptyTablePage />}
      resource={props.resource}
      expand={<SeasonExpand {...props} />}
      datagridWrapperClassName={classes.DatagridWrapperWithoutScroll}
      optimized
      offDescription
      isDependentModel
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
      <FunctionField
        label=""
        render={(record?: Record) => (
          <div className={classes.MoreActions}>
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
              text={
                record?.episodes.length ? `Episodes (${record?.episodes.length})` : "Add episodes"
              }
              onClick={() =>
                history.push(
                  record?.episodes.length
                    ? `/media_content/video/seasons/${record?.id}/episodes`
                    : `/media_content/video/seasons/${record?.id}/episodes/create`
                )
              }
            ></StandardButton>
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
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
