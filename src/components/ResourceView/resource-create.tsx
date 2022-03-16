import { FC } from "react";
import { Create } from "react-admin";
import { Box } from "@material-ui/core";

import { EditForm } from "./edit-form";

interface CreateProps {
  tab?: string;
  redirect?: string;
  resource: string;
}

export const ResourceCreate: FC<CreateProps> = (props) => {
  return (
    <>
      <Create {...props} component="div">
        <EditForm form="create" redirect={props.redirect} resource={props.resource}>
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Create>
    </>
  );
};
