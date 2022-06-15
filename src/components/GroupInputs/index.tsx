import * as React from "react";
import cn from "classnames";

import { Switch } from "../UI/MaterialUI/switch";
import { Collapse, makeStyles } from "@material-ui/core";
import { formHelperText, labelStyles } from "../Inputs/styles";
import { type InputFormType } from "../Inputs/input-types";
import { ArrayInputItemArrow } from "../../constants/icons";

const useStyles = makeStyles({
  GroupInputWrapper: {
    marginBottom: 8,
    "& input": {
      backgroundColor: "#fff",
    },
    "& .MuiSelect-root": {
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&:focus-within": {
        backgroundColor: "#fff",
      },
    },
  },
  GroupInputs: {
    padding: "12px 24px",
    marginTop: 8,
    backgroundColor: "var(--primary-bg)",
    borderRadius: 4,
    "&.showView": {
      backgroundColor: "transparent",
      padding: "8px 0px 0px 12px",
      marginTop: 0,
      paddingRight: 0,
      borderBottom: "1px solid var(--secondary-color-disable)",
      borderRadius: 0,
    },
    "& .ShowWrapper": {
      "&:first-child": {
        paddingTop: 0,
      },
      "&:last-child": {
        borderBottom: "none",
        marginBottom: 0,
      },
    },
    "& > div:first-child": {
      marginTop: 0,
    },
    "& .MuiCollapse-wrapperInner .MuiFormControl-root:first-child": {
      marginTop: 0,
    },
  },
  GroupInputsLabelWrapper: {
    "& .label": { ...labelStyles, marginRight: 9, marginBottom: 0 },
    display: "inline-block",
    cursor: "pointer",
    marginTop: 8,
  },
  GroupHelperText: formHelperText,
});

interface GroupInputsProps {
  label?: string;
  switchable?: boolean;
  groupHelperText?: string;
  className?: string;
  inputType: InputFormType;
  source?: string;
  resource?: string;
  index?: number | string;
  onlyCreateView?: boolean;
}

export const GroupInputsOrigin: React.FC<GroupInputsProps> = ({
  label,
  children,
  switchable,
  className,
  inputType,
  groupHelperText,
  onlyCreateView,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(["show", "edit"].includes(inputType) || false);

  return (
    <div>
      <div>
        {label && (
          <>
            <span
              style={{ cursor: switchable && inputType !== "show" ? "pointer" : "" }}
              onClick={() => setShow((p) => !p)}
              className={classes.GroupInputsLabelWrapper}
            >
              <span className="label">{label && label}</span>
              {switchable && inputType !== "show" && <Switch checked={show} />}
              {inputType === "show" && <ArrayInputItemArrow color="var(--secondary-color-main)" />}
            </span>
            {groupHelperText && inputType !== "show" && (
              <p className={classes.GroupHelperText}>{groupHelperText}</p>
            )}
          </>
        )}
      </div>
      <div
        className={cn(
          classes.GroupInputWrapper,
          inputType === "show" && !onlyCreateView && "showView",
          className
        )}
      >
        {switchable ? (
          <>
            <Collapse in={show} timeout="auto">
              <div
                className={cn(
                  classes.GroupInputs,
                  inputType === "show" && !onlyCreateView && "showView"
                )}
              >
                {children}
              </div>
            </Collapse>
          </>
        ) : (
          <div
            className={cn(
              classes.GroupInputs,
              inputType === "show" && !onlyCreateView && "showView"
            )}
          >
            <Collapse in={show} timeout="auto">
              {children}
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

export const GroupInputs: React.FC<GroupInputsProps> = ({ inputType, ...rest }) => (
  <GroupInputsOrigin inputType={inputType} {...rest} />
);
