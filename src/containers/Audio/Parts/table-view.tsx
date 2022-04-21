import * as React from "react";
import { DatagridList } from "../../../components/DatagridList";
import { EmptyTablePage } from "../../../components/EmptyTablePage";
import { FunctionField, TextField } from "react-admin";
import { Record as RecordRA } from "ra-core/esm/types";
import { MoreActionsButton } from "../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../components/UI/RA/delete-button";

interface ShowProps {
  resource: string;
  basePath?: string;
}

export const TableView: React.FC<ShowProps> = (props) => {
  return (
    <>
      <DatagridList {...props} optimized empty={<EmptyTablePage />}>
        <TextField source="name" label="Name" />
        <FunctionField
          label=""
          render={(record?: RecordRA) => (
            <MoreActionsButton>
              <EditButton color="secondary" record={record} basePath={props.basePath} />
              <DeleteButton record={record} basePath={props.basePath} />
            </MoreActionsButton>
          )}
        />
      </DatagridList>
    </>
  );
};
