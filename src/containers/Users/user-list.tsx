import { Datagrid, DateField, TextField } from "react-admin";

import { ResourceList } from "../../components/ResourceView";
import { filterTypes } from "../../types";
import { FilterTextInput } from "../../components/Inputs";
import { ListTabProps } from "../../components/Tabs/list-page-tabs";

const filters: filterTypes[] = [
  {
    source: "username",
    title: "Имя пользователя",
    component: FilterTextInput,
  },
  {
    source: "firstName",
    title: "Имя",
    component: FilterTextInput,
  },
];

export const UserList = (props: any) => {
  return (
    <>
      <ResourceList {...props} filtersArray={filters} resource={props.resource}>
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
