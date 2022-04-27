import * as React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { ShowProps } from "../../../../types";
import { DatagridList } from "../../../../components/DatagridList";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { Record as RecordRA } from "ra-core/esm/types";

export const Show: React.FC<ShowProps> = (props) => (
  <DatagridList
    listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
    {...props}
    empty={<EmptyTablePage />}
    optimized
    rowClick="edit"
  >
    <FunctionField label="Name" render={(record?: RecordRA) => record?.name} />
    <TextField source="position" label="Position" />
    <TextField source="slug" label="Slug" />
    <FunctionField
      label=""
      render={(record?: Record) => (
        <MoreActionsButton>
          <EditButton color="secondary" record={record} basePath={props.basePath} />
          <DeleteButton record={record} basePath={props.basePath} />
        </MoreActionsButton>
      )}
    />
  </DatagridList>
);
