import React from "react";
import { Datagrid, TextField } from "react-admin";

import { ShowProps } from "../../types";
import { EmptyTablePage } from "../../components/EmptyTablePage";

export const List: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid empty={<EmptyTablePage />} rowClick="show" optimized {...props}>
      <TextField source="name" />
    </Datagrid>
  );
};
