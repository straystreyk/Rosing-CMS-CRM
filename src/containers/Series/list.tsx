import React from "react";
import { TextField } from "react-admin";

import { ShowProps } from "../../types";
import { EmptyTablePage } from "../../components/EmptyTablePage";
import { DatagridList } from "../../components/DatagridList";

export const List: React.FC<ShowProps> = (props) => {
  return (
    <DatagridList empty={<EmptyTablePage />} optimized {...props}>
      <TextField source="name" label="name" />
    </DatagridList>
  );
};
