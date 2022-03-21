import * as React from "react";
import { Create, useRedirect, useRefresh } from "react-admin";
import { useNotify } from "ra-core";
import { Box } from "@material-ui/core";
import { EditForm } from "./edit-form";

interface CreateProps {
  redirect?: string;
  resource: string;
  basePath?: string;
  redirectToOtherModel?: string;
  messageArgs?: Record<string, string>;
}

export const ResourceCreate: React.FC<CreateProps> = ({ redirectToOtherModel, ...props }) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccess: (data: any) => void = ({ data }) => {
    notify(`resources.${props.resource}.mutations.create`, {
      type: "info",
      messageArgs: { name: data.name },
    });
    redirect("list", props.basePath, data.id, data);
    refresh();
  };

  return (
    <>
      <Create {...props} onSuccess={onSuccess} component="div">
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
