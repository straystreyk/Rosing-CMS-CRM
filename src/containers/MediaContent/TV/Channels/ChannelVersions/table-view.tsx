import * as React from "react";
import { TextField } from "react-admin";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";

export const TableView: React.FC<ShowProps> = (props) => {
  return (
    <DatagridList {...props} optimized>
      <TextField source="name" />
    </DatagridList>
  );
};
