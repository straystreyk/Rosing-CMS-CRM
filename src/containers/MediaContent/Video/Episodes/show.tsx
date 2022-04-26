import * as React from "react";
import { FunctionField, TextField, Record as RecordRA } from "react-admin";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { DatagridList } from "../../../../components/DatagridList";

interface ShowProps {
  resource: string;
  basePath?: string;
}

export const Show: React.FC<ShowProps> = (props) => {
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
