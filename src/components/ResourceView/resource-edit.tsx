import { FC } from "react";
import { Edit } from "react-admin";
import { Box } from "@material-ui/core";

import { ResourceTitle } from "./resource-title";
import { EditForm } from "./edit-form";

interface EditProps {
  resource: string;
  redirect?: string;
  id?: string;
}

export const ResourceEdit: FC<EditProps> = (props) => {
  return (
    <>
      <ResourceTitle id={props.id} name={props.resource} form="edit" />
      <Edit component="div" title={""} {...props}>
        <EditForm redirect={props.redirect} resource={props.resource}>
          <Box p={{ xs: "0 24px" }}>{props.children}</Box>
        </EditForm>
      </Edit>
    </>
  );
};
