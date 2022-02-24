import * as React from "react";
import { Datagrid, TextField } from "react-admin";

interface ShowProps {
  resource: string;
}

export const Show: React.FC<ShowProps> = (props) => (
  <Datagrid {...props} optimized rowClick="edit">
    <TextField source="name" />
    <TextField source="slug" />
  </Datagrid>
);
