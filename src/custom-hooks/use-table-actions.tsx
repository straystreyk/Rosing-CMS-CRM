import * as React from "react";
import { useMutation, useRefresh } from "react-admin";
import { Identifier, useNotify } from "ra-core";

export const useTableActions = (props: { resource: string }) => {
  const [mutate, { data, error, loading }] = useMutation();
  const refresh = useRefresh();
  const notify = useNotify();

  const approve = React.useCallback(
    async (id?: Identifier, updateOpts?: Record<string, string | boolean | number | string[]>) => {
      if (!id || !updateOpts) return;

      await mutate({
        type: "update",
        resource: props.resource,
        payload: { id, data: { ...updateOpts } },
      });
    },
    [mutate, props.resource]
  );

  React.useEffect(() => {
    if (data && !error) {
      notify(`resources.${props.resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });
      refresh();
    }
    if (error) {
      notify(`resources.${props.resource}.mutations.list.error`, {
        type: "error",
        messageArgs: { error },
      });
    }
  }, [notify, props.resource, refresh, data, error]);

  return { loading, approve };
};
