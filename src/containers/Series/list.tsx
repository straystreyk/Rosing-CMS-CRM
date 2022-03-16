import React from "react";
import { Datagrid, TextField } from "react-admin";
import { ShowProps } from "../../types";

export const List: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid rowClick="show" optimized {...props}>
      <TextField source="name" />
    </Datagrid>
  );
};
