import * as React from "react";
import { Backdrop, Box } from "@material-ui/core";
import { Edit, ShowProps as ShowPropsRA, useLoading } from "react-admin";
import { EditForm } from "./FormWithRedirect";
import { MainLoader } from "../MainLoader";

const EmptyToolbar = () => <></>;

interface ShowProps extends ShowPropsRA {
  redirect?: "show" | "create" | "edit";
  resource: string;
  basePath?: string;
  actionButtons?: React.ReactNode;
}

const LOADER_SIZE = 70;

export const ResourceShow: React.FC<ShowProps> = (props) => {
  const loading = useLoading();
  return (
    <>
      <Edit actions={<EmptyToolbar />} component="div" title={""} {...props}>
        <EditForm
          {...props}
          form="show"
          redirect={props.redirect}
          resource={props.resource}
          actionButtons={props.actionButtons}
          offToolbar
        >
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Edit>
      {loading && (
        <Backdrop style={{ zIndex: 5000 }} open={loading}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </Backdrop>
      )}
    </>
  );
};
