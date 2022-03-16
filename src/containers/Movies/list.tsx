import * as React from "react";
import { Datagrid, DateField, TextField } from "react-admin";

interface ShowProps {
  resource: string;
}

export const List: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid {...props} optimized rowClick="show">
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="cmsDistribution" />
      <DateField source="createdAt" />
    </Datagrid>
  );
};
