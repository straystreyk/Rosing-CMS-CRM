import * as React from "react";
import { Datagrid, TextField } from "react-admin";
import { EmptyTablePage } from "../../components/EmptyTablePage";

interface ShowProps {
  resource: string;
}

export const Show: React.FC<ShowProps> = (props) => (
  <Datagrid {...props} optimized empty={<EmptyTablePage />} rowClick="edit">
    <TextField source="name" label="Episode" />
    <TextField source="season.name" label="Season" />
  </Datagrid>
);
