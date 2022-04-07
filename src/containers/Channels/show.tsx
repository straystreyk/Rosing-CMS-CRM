import { FC } from "react";
import { Datagrid, TextField, FunctionField } from "react-admin";
import { PublishedIcons, UnPublishedIcons } from "../../constants/icons";

interface ShowInterface {
  resource: string;
}

export const Show: FC<ShowInterface> = (props) => {
  return (
    <Datagrid {...props} rowClick="edit" optimized>
      <TextField source="name" />
      <TextField source="slug" />
      <FunctionField
        label="Markers"
        render={({ markers }: { markers: [] }) => (markers ? markers.join(", ") : null)}
      />
      <TextField source="synopsis" />
      <TextField source="position" />
      <TextField source="createdAt" />
      <FunctionField label="Updated" render={({ updatedAt }: { updatedAt: string }) => updatedAt} />
      <FunctionField
        label="Published"
        render={({ published }: { published: boolean }) =>
          published ? <PublishedIcons /> : <UnPublishedIcons />
        }
      />
    </Datagrid>
  );
};
