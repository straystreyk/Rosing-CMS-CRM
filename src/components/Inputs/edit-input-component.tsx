import * as React from "react";
import cn from "classnames";
import { useForm, useFormState } from "react-final-form";
import { useMutation } from "react-admin";
import { MainLoader } from "../MainLoader";
import { AcceptFilterIcon, CancelFilterIcon, EditIcon } from "../../constants/icons";
import { makeStyles, Tooltip } from "@material-ui/core";
import { useNotify } from "ra-core";
import { StandardButton } from "../UI/Buttons/standard-button";
import { useRefresh } from "react-admin";

const useStyles = makeStyles((theme) => ({
  ShowWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingTop: 8,
    position: "relative",
    paddingBottom: 8,
    "&:hover .ShowEditButton": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  ShowEditButtonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginLeft: 8,
    },
  },
  ShowEditButton: {
    cursor: "pointer",
    position: "absolute",
    opacity: 0,
    zIndex: 1,
    top: 8,
    right: 0,
    transition: "0.35s all ease",
    "& svg path": {
      transition: "0.35s all ease",
    },
    "&:hover svg path": {
      fill: "#005AA3",
    },
  },
}));

export const EditInputComponent: React.FC<any> = ({
  componentClassName,
  ComponentShow,
  ComponentInput,
  borderOff,
  ...props
}) => {
  const { values } = useFormState();
  const form = useForm();
  const [mutate, { loading, error }] = useMutation();
  const [showInput, setShowInput] = React.useState(false);
  const [initialValue] = React.useState(values[props.source]);
  const notify = useNotify();
  const classes = useStyles();
  const refresh = useRefresh();

  React.useEffect(() => {
    if (error) {
      notify(error.message, { type: "error" });
      form.change(props.source, initialValue);
    }
  }, [error]);

  const approve = React.useCallback(async () => {
    await mutate({
      type: "update",
      resource: props.resource,
      payload: { id: values.id, data: { ...values, [props.source]: values[props.source] } },
    });

    setShowInput(false);
  }, [mutate, props.source, values]);

  const cancelEdit = React.useCallback(() => {
    form.change(props.source, initialValue);
    setShowInput(false);
  }, [form, initialValue]);

  return (
    <div
      style={{
        flexDirection: showInput ? "column" : "row",
        alignItems: !showInput ? "center" : "",
        borderBottom: borderOff && !showInput ? "none" : "1px solid #E7E9E9",
      }}
      className={classes.ShowWrapper}
    >
      {showInput && ComponentInput && (
        <ComponentInput
          {...props}
          fullWidth={props.fullWidth ?? false}
          helperText={props.helperText && showInput ? props.helperText : false}
          resettable={props.resettable && showInput ? props.resettable : false}
          ChildComponent={props.ChildComponent ?? false}
          draggable={props.draggable ?? false}
        />
      )}
      {ComponentShow && !showInput && <ComponentShow {...props} label={props.label} />}
      {showInput ? (
        <div className={classes.ShowEditButtonsWrapper}>
          <StandardButton
            startIcon={loading ? <MainLoader flex size={10} /> : <AcceptFilterIcon color="" />}
            type="button"
            customColor="var(--accent-color)"
            variant="text"
            onClick={approve}
          >
            Save
          </StandardButton>
          <StandardButton
            type="button"
            color="secondary"
            variant="text"
            startIcon={<CancelFilterIcon color="#005AA3" />}
            onClick={cancelEdit}
          >
            Cancel
          </StandardButton>
        </div>
      ) : (
        <>
          {props.source !== "slug" && (
            <Tooltip title="Fast edit" placement="left" arrow>
              <div
                className={cn(classes.ShowEditButton, "ShowEditButton")}
                onClick={() => setShowInput(true)}
              >
                <EditIcon color="var(--secondary-color-default)" />
              </div>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};
