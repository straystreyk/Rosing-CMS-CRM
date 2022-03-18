import { FC } from "react";
import { Create } from "react-admin";
import { Box } from "@material-ui/core";
import { EditForm } from "./edit-form";

interface CreateProps {
  redirect?: string;
  resource: string;
  basePath?: string;
  redirectToOtherModel?: string;
}

export const ResourceCreate: FC<CreateProps> = ({ redirectToOtherModel, ...props }) => {
  return (
    <>
      <Create {...props} component="div">
        <EditForm
          form="create"
          redirect={props.redirect}
          resource={props.resource}
          redirectToOtherModel={redirectToOtherModel}
        >
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Create>
    </>
  );
};
