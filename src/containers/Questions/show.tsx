import * as React from "react";
import { Datagrid, DateField, TextField } from "react-admin";

interface ShowProps {
  resource: string;
}

export const Show: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid {...props} optimized rowClick="edit">
      <TextField source="questionTemplate" />
    </Datagrid>
  );
};
