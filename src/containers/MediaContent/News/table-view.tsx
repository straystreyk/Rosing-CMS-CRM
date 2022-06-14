import * as React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { DatagridList } from "../../../components/DatagridList";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../components/TableFields/styles";
import { ShowProps } from "../../../types";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";
import {
  PublishedIcons,
  PublishIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../../constants/icons";
import { newsFilters } from "./news-filters";
import { StandardButton } from "../../../components/UI/Buttons/standard-button";
import { useTableActions } from "../../../custom-hooks/use-table-actions";
import { PublishedField } from "../../../components/TableFields/published-field";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const { loading, approve } = useTableActions(props);
  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      filters={newsFilters}
      {...props}
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
      <TextField label="Slug" source="slug" />
      <FunctionField
        label="Image"
        source="images"
        render={(record?: RecordRA) =>
          record?.images.length ? (
            <span>Has images ({record?.images.length})</span>
          ) : (
            <span className={classes.Empty}>No images</span>
          )
        }
      />
      <FunctionField
        label=""
        render={(record?: Record) => (
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
                color="secondary"
                variant="textWithBg"
                startIcon={record?.published ? <UnPublishIcon /> : <PublishIcon />}
              >
                {record?.published ? <>Unpublish</> : <>Publish</>}
              </StandardButton>
              <EditButton
                disabled={loading}
                color="secondary"
                record={record}
                basePath={props.basePath}
              />
              <DeleteButton disabled={loading} record={record} basePath={props.basePath} />
            </MoreActionsButton>
          </div>
        )}
      />
    </DatagridList>
  );
};
