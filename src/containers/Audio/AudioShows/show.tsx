import * as React from "react";
import { FunctionField, Record, TextField } from "react-admin";
import { ShowProps } from "../../../types";
import { DatagridList } from "../../../components/DatagridList";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";

export const Show: React.FC<ShowProps> = (props) => (
  <DatagridList {...props} empty={<>This section is empty</>} optimized rowClick="edit">
    <TextField source="name" label="Name" />
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
