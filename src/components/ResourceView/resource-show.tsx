import * as React from "react";
import { Box } from "@material-ui/core";
import { Edit, ShowProps as ShowPropsRA } from "react-admin";
import { EditForm } from "./FormWithRedirect";

const EmptyToolbar = () => <></>;

interface ShowProps extends ShowPropsRA {
  redirect?: "show" | "create" | "edit";
  resource: string;
  basePath?: string;
}

export const ResourceShow: React.FC<ShowProps> = (props) => {
  return (
    <>
      <Edit actions={<EmptyToolbar />} component="div" title={""} {...props}>
        <EditForm
          {...props}
          form="show"
          redirect={props.redirect}
          resource={props.resource}
          offToolbar
        >
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Edit>
    </>
  );
};
