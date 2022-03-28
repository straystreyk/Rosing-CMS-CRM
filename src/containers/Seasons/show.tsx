import React, { FC } from "react";
import { Datagrid, TextField } from "react-admin";

interface ShowInterface {
  resource: string;
  basePath?: string;
}

export const Show: FC<ShowInterface> = (props) => {
  const rowClick: (id: string) => string = React.useCallback(
    (id) => {
      return props.basePath + "/" + id;
    },
    [props.basePath]
  );

  return (
    <Datagrid {...props} optimized rowClick={rowClick}>
      <TextField source="name" />
      <TextField source="slug" />
    </Datagrid>
  );
};
