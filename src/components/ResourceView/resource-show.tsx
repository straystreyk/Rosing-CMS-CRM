import * as React from "react";
import { Box } from "@material-ui/core";
import { Edit } from "react-admin";
import { EditForm } from "./edit-form";

interface ResourceShowProps {
  resource: string;
  redirect?: string;
  id?: string;
}

const EmptyToolbar = () => <></>;

export const ResourceShow: React.FC<ResourceShowProps> = (props) => {
  return (
    <>
      <Edit actions={<EmptyToolbar />} component="div" title={""} {...props}>
        <EditForm
          {...props}
          form="show"
          offToolbar
          redirect={props.redirect}
          resource={props.resource}
        >
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Edit>
    </>
  );
};
