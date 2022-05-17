import * as React from "react";
import {
  SaveButton,
  TabbedForm as TabbedFormRA,
  TabbedFormTabs,
  Toolbar,
  useRedirect,
  useRefresh,
} from "react-admin";
import { useNotify } from "ra-core";

const PostEditToolbar = (props: any) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const onSuccessWithRedirectDefault: (data: any) => void = React.useCallback(
    ({ data }) => {
      notify(`resources.${props.resource}.mutations.create.success`, {
        type: "info",
      });
      redirect("list", `${props.basePath}/create`, data.id, data);
      refresh();
    },
    [notify, props.basePath, props.resource, redirect, refresh]
  );

  return (
    <Toolbar {...props}>
      <SaveButton handleSubmitWithRedirect={onSuccessWithRedirectDefault} />
    </Toolbar>
  );
};

export const TabbedForm: React.FC<{ formType: "create" | "edit" | "show"; resource: string }> = ({
  children,
  formType,
  resource,
}) => {
  return (
    <>
      <TabbedFormRA
        tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}
        toolbar={<PostEditToolbar />}
        id={resource}
      >
        {children}
      </TabbedFormRA>
    </>
  );
};
