import * as React from "react";
import { Create, useRedirect, useRefresh, Edit } from "react-admin";
import { useNotify } from "ra-core";
import { Box } from "@material-ui/core";
import { EditForm } from "./FormWithRedirect";

interface CreateProps {
  redirect?: string;
  resource: string;
  basePath?: string;
  onSuccess?: (data: any) => void;
  onFailure?: (error: Error) => void;
  onSuccessWithRedirect?: (data: any) => void;
  redirectButtonLabel?: string;
  redirectButtonIcon?: React.ReactElement;
  messageArgs?: Record<string, string>;
  offRedirectButton?: boolean;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  hasList?: boolean;
}

const SCROLL_TO_OPTS: ScrollToOptions = {
  behavior: "smooth",
  top: 0,
};

export const ResourceCreate: React.FC<CreateProps> = ({
  onSuccessWithRedirect,
  offRedirectButton,
  messageArgs,
  hasCreate,
  hasEdit,
  hasShow,
  hasList,
  ...props
}) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const onSuccessWithRedirectDefault: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
        messageArgs: messageArgs ?? { name: data.name },
      });
      redirect("list", `${props.basePath}/create`, data.id, data);
      window.scrollTo(SCROLL_TO_OPTS);
      refresh();
    },
    [messageArgs, notify, props.basePath, props.resource, redirect, refresh]
  );

  const onSuccess: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
        messageArgs: messageArgs ?? { name: data.name },
      });
      redirect("list", props.basePath, data.id, data);
      refresh();
    },
    [messageArgs, notify, props.basePath, props.resource, redirect, refresh]
  );

  const onFailure = React.useCallback(
    (error: Error) => {
      notify(`resources.${props.resource}.mutations.create.error`, {
        type: "error",
        messageArgs: { error: error.message },
      });
    },
    [notify, props.resource]
  );

  return (
    <>
      <Create {...props} component="div">
        <EditForm
          onSuccess={props.onSuccess ?? onSuccess}
          onFailure={props.onFailure ?? onFailure}
          onSuccessWithRedirect={onSuccessWithRedirect ?? onSuccessWithRedirectDefault}
          redirectButtonLabel={props.redirectButtonLabel}
          redirectButtonIcon={props.redirectButtonIcon}
          redirect={props.redirect}
          resource={props.resource}
          offRedirectButton={offRedirectButton}
          form="create"
        >
          <Box style={{ position: "relative" }} p={{ xs: "0px 24px 100px 24px" }}>
            {props.children}
          </Box>
        </EditForm>
      </Create>
    </>
  );
};
