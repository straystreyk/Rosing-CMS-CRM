import { Datagrid, DateField, TextField } from "react-admin";

import { ResourceList } from "../../components/ResourceView";

export const UserList = (props: any) => {
  return (
    <>
      <ResourceList {...props} resource={props.resource}>
        <Datagrid optimized rowClick="edit">
          <TextField source="email" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <DateField
            source="createdAt"
            options={{
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </Datagrid>
      </ResourceList>
    </>
  );
};
