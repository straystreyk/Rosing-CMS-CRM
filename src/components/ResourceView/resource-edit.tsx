import * as React from "react";
import { FC } from "react";
import { Edit } from "react-admin";
import { Box } from "@material-ui/core";

import { EditForm } from "./edit-form";

interface EditProps {
  resource: string;
  redirect?: string;
  basePath?: string;
  id?: string;
}

const EmptyToolbar = () => <></>;

export const ResourceEdit: FC<EditProps> = (props) => {
  return (
    <>
      <Edit actions={<EmptyToolbar />} component="div" title={""} {...props}>
        <EditForm form="edit" redirect={props.redirect} resource={props.resource}>
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Edit>
    </>
  );
};
