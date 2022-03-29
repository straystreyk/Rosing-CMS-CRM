import * as React from "react";
import { Datagrid, TextField, ReferenceField } from "react-admin";
import { EmptyTablePage } from "../../components/EmptyTablePage";
import { ShowProps } from "../../types";

export const List: React.FC<ShowProps> = (props) => {
  return (
    <Datagrid empty={<EmptyTablePage />} {...props} optimized rowClick="show">
      <TextField source="name" />
      <TextField source="streamingUid" />
      <ReferenceField label="Datacenter" source="datacenterId" reference="datacenters">
        <TextField source="name" fullWidth />
      </ReferenceField>
    </Datagrid>
  );
};
