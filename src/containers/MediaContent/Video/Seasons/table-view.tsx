import React from "react";
import { FunctionField, Record } from "react-admin";
import { Record as RecordRA } from "ra-core/esm/types";
import { makeStyles } from "@material-ui/core/styles";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { StandardButton } from "../../../../components/UI/Buttons/StandardButton/standard-button";
import { PublishIcon, UnPublishIcon } from "../../../../constants/icons";
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
import { PublishedField } from "../../../../components/TableFields/published-field";
import { ExpandNameField } from "../../../../components/TableFields/expand-name-field";

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
          <ExpandNameField
            title={`Season ${record?.number}`}
            to={`${props.basePath}/${record?.id}/show`}
            name={record?.name}
          />
        )}
      />
      <FunctionField
        label=""
        className={classes.ButtonCell}
        render={(record?: Record) => (
          <div className={classes.MoreActions}>
            <ToModelField
              record={record!}
              to="/media_content/video/seasons"
              source="episodes"
              label="Episodes"
              alwaysButton
            />
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
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
