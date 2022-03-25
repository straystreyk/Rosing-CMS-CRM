import React, { FC } from "react";
import { Datagrid, DateField, TextField } from "react-admin";

interface ShowInterface {
  resource: string;
}

export const Show: FC<ShowInterface> = (props) => {
  return (
    <Datagrid {...props} optimized rowClick="show">
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="cmsDistribution" />
      <DateField source="createdAt" />
    </Datagrid>
  );
};
