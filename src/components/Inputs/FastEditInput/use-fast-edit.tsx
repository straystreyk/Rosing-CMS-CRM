import * as React from "react";
import _ from "lodash";
import { useForm, useFormState } from "react-final-form";
import { useMutation, useRefresh } from "react-admin";
import { useNotify } from "ra-core";

export const useFastEdit = (resource: string, source: string) => {
  const form = useForm();
  const { values } = useFormState();
  const currentFieldValue = _.get(values, source);
  const [mutate, { loading, error, data }] = useMutation();
  const [showInput, setShowInput] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState(currentFieldValue);
  const refresh = useRefresh();
  const notify = useNotify();

  React.useEffect(() => {
    if (data) {
      form.change(source, data[source]);
      notify(`resources.${resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });

      setInitialValue(data[source]);
      refresh();
    }

    if (error) {
      notify(error.message, { type: "error" });
      form.change(source, initialValue);
      setShowInput(true);
    }
  }, [error, data]);

  const approve = React.useCallback(async () => {
    await mutate({
      type: "update",
      resource: resource,
      payload: { id: values.id, data: { ...values, [source]: currentFieldValue ?? null } },
    });

    setShowInput(false);
  }, [resource, mutate, source, values]);

  const cancelEdit = React.useCallback(() => {
    form.change(source, initialValue);
    setShowInput(false);
  }, [source, form, initialValue]);

  const showEditInput = React.useCallback(() => {
    setInitialValue(currentFieldValue);

    setShowInput(true);
  }, [currentFieldValue]);

  return {
    approve,
    cancelEdit,
    showEditInput,
    showInput,
    loading,
  };
};
