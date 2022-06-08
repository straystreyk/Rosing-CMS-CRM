import * as React from "react";
import { FunctionField, TextField } from "react-admin";
import { ShowProps } from "../../../../types";
import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { ReferenceField } from "../../../../components/TableFields/reference-field";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import {
  ArrowIconDown,
  ArrowIconUp,
  PublishedIcons,
  PublishIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../../../constants/icons";
import { useTableActions } from "../../../../custom-hooks/use-table-actions";
import { ToModelField } from "../../../../components/TableFields/to-model-field";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { loading, approve } = useTableActions(props);

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      {...props}
      empty={<EmptyTablePage />}
      draggable
      optimized
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
      <TextField label="Slug" source="slug" />
      <ReferenceField
        label="External catalog"
        source="media_content/attributes/providers/content_providers"
        emptyText={<span className={classes.Empty}>Empty</span>}
        reference="datacenters"
        offsort
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <FunctionField
        offsort
        label="Parts"
        render={(record?: RecordRA) => (
          <ToModelField record={record!} to={`/${props.resource}`} source="parts" label="Parts" />
        )}
      />
      <FunctionField
        label=""
        className={classes.MoreActions}
        render={(record?: RecordRA) => (
          <div>
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
                text={record?.published ? "Unpublish" : "Publish"}
                startIcon={record?.published ? <UnPublishIcon /> : <PublishIcon />}
              />
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: 1 })}
                disabled={loading}
                color="secondary"
                variant="textWithBg"
                startIcon={<ArrowIconUp />}
                text="To the top of the list"
              />
              <StandardButton
                onClick={() => approve(record?.id, { ...record, position: props.total ?? 0 })}
                startIcon={<ArrowIconDown />}
                disabled={loading}
                variant="textWithBg"
                color="secondary"
                text="To the bottom of the list"
              />
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
