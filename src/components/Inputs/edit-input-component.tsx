import * as React from "react";
import cn from "classnames";
import { useForm, useFormState } from "react-final-form";
import { useMutation } from "react-admin";
import { MainLoader } from "../MainLoader";
import { AcceptFilterIcon, CancelFilterIcon, EditIcon } from "../../constants/icons";
import { makeStyles, Tooltip } from "@material-ui/core";
import { useNotify } from "ra-core";
import { StandardButton } from "../UI/Buttons/standard-button";
import { MEDIA_QUERIES_BREAKPOINTS, ShowEditButton } from "../../constants/style-constants";

const useStyles = makeStyles((theme) => ({
  ShowWrapper: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    paddingTop: 6,
    marginBottom: 6,
    borderBottom: "1px solid var(--secondary-color-disable)",
    paddingBottom: 12,
    "&:hover .ShowEditButton": {
      opacity: 1,
      pointerEvents: "all",
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`]: {
      "& .ShowEditButton": {
        opacity: 1,
        pointerEvents: "all",
      },
    },
  },
  ShowEditButtonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginLeft: 8,
    },
  },
  BorderOff: {
    border: "none",
  },
  ShowEditButton,
}));

export const EditInputComponent: React.FC<any> = ({
  ComponentShow,
  ComponentInput,
  ChildComponent,
  borderOff,
  showWrapperClassName,
  ...props
}) => {
  const form = useForm();
  const { values } = useFormState();
  const [mutate, { loading, error, data }] = useMutation();
  const [showInput, setShowInput] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState(values[props.source]);
  const notify = useNotify();
  const classes = useStyles();

  React.useEffect(() => {
    if (data) {
      form.change(props.source, data[props.source]);
      notify(`resources.${props.resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });

      setInitialValue(data[props.source]);
    }

    if (error) {
      notify(error.message, { type: "error" });
      form.change(props.source, initialValue);
    }
  }, [error, data]);

  const approve = React.useCallback(async () => {
    await mutate({
      type: "update",
      resource: props.resource,
      payload: { id: values.id, data: { ...values, [props.source]: values[props.source] ?? null } },
    });

    setShowInput(false);
  }, [props.resource, mutate, props.source, values]);

  const cancelEdit = React.useCallback(() => {
    form.change(props.source, initialValue);
    setShowInput(false);
  }, [props.source, form, initialValue]);

  const showEditInput = React.useCallback(() => {
    setInitialValue(values[props.source]);

    setShowInput(true);
  }, [values[props.source]]);

  return (
    <div
      style={{
        flexDirection: showInput ? "column" : "row",
        alignItems: !showInput ? "center" : "",
      }}
      className={cn(
        classes.ShowWrapper,
        "ShowWrapper",
        showInput && "active",
        borderOff && !showInput && classes.BorderOff,
        showWrapperClassName && showWrapperClassName
      )}
    >
      {showInput && ComponentInput && (
        <ComponentInput
          {...props}
          fullWidth={props.fullWidth ?? false}
          helperText={props.helperText && showInput ? props.helperText : false}
          resettable={props.resettable && showInput ? props.resettable : false}
          ChildComponent={ChildComponent ?? false}
          draggable={props.draggable ?? false}
        />
      )}
      {ComponentShow && !showInput && <ComponentShow {...props} label={props.label} />}
      {showInput ? (
        <div className={classes.ShowEditButtonsWrapper}>
          <StandardButton
            startIcon={
              loading ? (
                <MainLoader flex size={10} />
              ) : (
                <AcceptFilterIcon color="var(--accent-color)" />
              )
            }
            type="button"
            customColor="var(--accent-color)"
            variant="text"
            onClick={approve}
            text="Save"
          />
          <StandardButton
            type="button"
            color="secondary"
            variant="text"
            startIcon={<CancelFilterIcon color="var(--primary-button-default)" />}
            onClick={cancelEdit}
            text="Cancel"
          />
        </div>
      ) : (
        <>
          {props.source !== "slug" && !props.offFastEdit ? (
            <Tooltip title="Fast edit" placement="left" arrow>
              <div className={cn(classes.ShowEditButton, "ShowEditButton")} onClick={showEditInput}>
                <EditIcon color="var(--secondary-color-default)" />
              </div>
            </Tooltip>
          ) : null}
        </>
      )}
    </div>
  );
};
