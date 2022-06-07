import * as React from "react";
import { FC } from "react";
import { Edit, useLoading, useRedirect, useRefresh } from "react-admin";
import { Backdrop, Box } from "@material-ui/core";

import { EditForm } from "./FormWithRedirect";
import { useNotify } from "ra-core";
import { MainLoader } from "../MainLoader";

interface EditProps {
  resource: string;
  redirect?: string;
  basePath?: string;
  query?: any;
  id?: string;
}

const EmptyToolbar = () => <></>;
const LOADER_SIZE = 70;

export const ResourceEdit: FC<EditProps> = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const loading = useLoading();

  const onSuccess: () => void = React.useCallback(() => {
    notify(`resources.${props.resource}.mutations.edit.success`, {
      type: "info",
      undoable: false,
    });
    redirect(`${props.basePath as string}/${props!.id}/show`, props.basePath);
    refresh();
  }, [notify, props.basePath, props.resource, redirect, refresh]);

  const onFailure = React.useCallback(
    (error: Error) => {
      notify(`resources.${props.resource}.mutations.edit.error`, {
        type: "error",
        messageArgs: { error: error.message },
      });
      redirect("list", props.basePath);
      refresh();
    },
    [notify, props.basePath, props.resource, refresh, redirect]
  );

  return (
    <>
      <Edit
        actions={<EmptyToolbar />}
        onSuccess={onSuccess}
        onFailure={onFailure}
        component="div"
        title={""}
        undoable={false}
        {...props}
      >
        <EditForm form="edit" redirect={props.redirect} resource={props.resource}>
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
