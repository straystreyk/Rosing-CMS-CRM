import * as React from "react";
import cn from "classnames";
import { MainLoader } from "../../MainLoader";
import { AcceptFilterIcon, CancelFilterIcon, EditIcon } from "../../../constants/icons";
import { makeStyles, Tooltip } from "@material-ui/core";
import { StandardButton } from "../../UI/Buttons/StandardButton/standard-button";
import { InputProps } from "../input-types";
import { EditInputComponentStyles } from "./styles";
import { useFastEdit } from "./use-fast-edit";

interface EditInputComponentProps extends InputProps {
  ComponentInput: React.FC<any>;
  ComponentShow: React.FC<any>;
  ChildComponent?: React.FC<any>;
}

const useStyles = makeStyles(EditInputComponentStyles);

export const EditInputComponent: React.FC<EditInputComponentProps> = ({
  ComponentShow,
  ComponentInput,
  ChildComponent,
  borderOff,
  showWrapperClassName,
  ...props
}) => {
  const classes = useStyles();
  const { showEditInput, showInput, cancelEdit, approve, loading } = useFastEdit(
    props.resource,
    props.source
  );

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
          inputType="create"
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
            startIcon={loading ? <MainLoader flex size={10} /> : <AcceptFilterIcon />}
            type="button"
            buttonType="primary"
            variant="text"
            onClick={approve}
            text="Save"
          />
          <StandardButton
            type="button"
            buttonType="secondary"
            variant="text"
            startIcon={<CancelFilterIcon />}
            onClick={cancelEdit}
            text="Cancel"
          />
        </div>
      ) : (
        <>
          {props.source !== "slug" && !props.offFastEdit ? (
            <Tooltip title="Fast edit" placement="left" arrow>
              <div className={cn(classes.ShowEditButton, "ShowEditButton")} onClick={showEditInput}>
                <EditIcon className="icon" />
              </div>
            </Tooltip>
          ) : null}
        </>
      )}
    </div>
  );
};
