import * as React from "react";
import { Record as RecordRA } from "react-admin";
import { FunctionField } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { ShowProps } from "../../../../types";
import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { UrlField } from "../../../../components/TableFields/url-field";

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
        label=""
        render={(record?: RecordRA) => {
          return (
            <div className={classes.MoreActions}>
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
