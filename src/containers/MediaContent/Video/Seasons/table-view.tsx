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
import { ToModelField } from "../../../../components/TableFields/to-model-field";
import cn from "classnames";

const useStyles = makeStyles(TableFieldsStyles);

const SeasonExpand: React.FC<{ resource: string }> = ({ resource, ...props }) => {
  return (
    <ExpandWrapper>
      <Form resource={resource} type="show" />
    </ExpandWrapper>
  );
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { loading, approve } = useTableActions(props);

  return (
    <DatagridList
      toolbar={Toolbar}
      basePath={props.basePath}
      empty={<EmptyTablePage />}
      resource={props.resource}
      expand={<SeasonExpand {...props} />}
      isDependentModel
      offDescription
      optimized
    >
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link
            className={cn(classes.NameField, "Expand")}
            to={`${props.basePath}/${record?.id}/show`}
          >
            {record?.name}
          </Link>
        )}
      />
      <FunctionField
        label=""
        render={(record?: Record) => (
          <div className={classes.MoreActions}>
            <ToModelField
              record={record!}
              to="/media_content/video/seasons"
              source="episodes"
              label="Episodes"
              alwaysButton
            />
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
