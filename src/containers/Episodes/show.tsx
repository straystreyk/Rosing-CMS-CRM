import * as React from "react";
import { Datagrid, FunctionField, TextField } from "react-admin";
import { EmptyTablePage } from "../../components/EmptyTablePage";
import { MoreActionsButton } from "../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../components/UI/RA/edit-button";
import { DeleteButton } from "../../components/UI/RA/delete-button";

interface ShowProps {
  resource: string;
  basePath?: string;
}

export const Show: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid {...props} optimized empty={<EmptyTablePage />}>
      <TextField source="name" label="Name" />
      <FunctionField
        label=""
        render={(record: { id: string; episodes: { id: string }[] }) => (
          <MoreActionsButton>
            <EditButton
              color="secondary"
              record={record}
              basePath={props.basePath + "/" + record.id}
            />
            <DeleteButton record={record} basePath={props.basePath + "/" + record.id} />
          </MoreActionsButton>
        )}
      />
    </Datagrid>
  );
};
