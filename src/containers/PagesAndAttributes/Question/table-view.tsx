import * as React from "react";
import { ShowProps } from "../../../types";
import { DatagridList } from "../../../components/DatagridList";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { UrlField } from "../../../components/TableFields/url-field";
import { FunctionField } from "ra-ui-materialui";
import { Record as RecordRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../components/TableFields/styles";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";
import { PublishedField } from "../../../components/TableFields/published-field";

const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      optimized
      draggable
    >
      <FunctionField
        label="Question"
        render={(record?: RecordRA) => (
          <UrlField to={`/${props.resource}/${record?.id}/show`} name={record?.questionTemplate} />
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
        label="Platforms"
        source="platforms"
        render={(record?: RecordRA) =>
          record?.platforms.length ? (
            <span>{record?.platforms.join(", ")}</span>
          ) : (
            <span className={classes.Empty}>Empty</span>
          )
        }
      />
      <FunctionField
        label=""
        render={(record?: RecordRA) => {
          return (
            <div className={classes.MoreActions}>
              <PublishedField published={record?.published} />
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          );
        }}
      />
    </DatagridList>
  );
};
