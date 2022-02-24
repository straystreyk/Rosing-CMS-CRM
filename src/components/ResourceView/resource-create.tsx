import { FC } from "react";
import { Create } from "react-admin";
import { Box } from "@material-ui/core";

import { ResourceTitle } from "./resource-title";
import { EditForm } from "./edit-form";

interface CreateProps {
  tab?: string;
  redirect?: string;
  resource: string;
  hasList?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  hasCreate?: boolean;
}

export const ResourceCreate: FC<CreateProps> = (props) => {
  return (
    <>
      <ResourceTitle name={props.resource} form="create" />
      <Create {...props} component="div">
        <EditForm redirect={props.redirect} resource={props.resource}>
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 135px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Create>
    </>
  );
};
