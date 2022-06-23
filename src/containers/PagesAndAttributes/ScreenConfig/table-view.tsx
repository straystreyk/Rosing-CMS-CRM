import * as React from "react";
import { ShowProps } from "../../../types";
import { DatagridList } from "../../../components/DatagridList";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { makeStyles } from "@material-ui/core";
import { TableFieldsStyles } from "../../../components/TableFields/styles";
import { UrlField } from "../../../components/TableFields/url-field";
import { FunctionField } from "ra-ui-materialui";
import { Record as RecordRA, TextField } from "react-admin";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";

import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";

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
        label="Screen"
        source="screen"
        render={(record?: RecordRA) => (
          <UrlField to={`${props.basePath}/${record?.id}/show`} name={record?.screen} />
        )}
      />
      <TextField className={classes.IDField} label="id" source="id" />
      <TextField label="Additional Name" source="cardConfig.additionalNameAttribute" />
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
