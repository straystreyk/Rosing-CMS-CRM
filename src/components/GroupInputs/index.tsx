import * as React from "react";
import cn from "classnames";

import { Switch } from "../UI/Buttons/switch";
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
  GroupInputsItem: {
    padding: "12px 24px",
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
    "& span": {
      cursor: "pointer",
    },
    display: "inline-block",
    marginTop: 8,
    marginBottom: 8,
    "& .icon": {
      width: 8,
    },
    "&.showView": {
      marginBottom: 0,
    },
  },
  GroupHelperText: { ...formHelperText, marginTop: 0 },
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
  nodesWithoutBG?: React.ReactNode;
}

export const GroupInputsOrigin: React.FC<GroupInputsProps> = ({
  label,
  children,
  switchable,
  className,
  inputType,
  groupHelperText,
  onlyCreateView,
  nodesWithoutBG,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);

  return (
    <div>
      {label && (
        <div className={cn(classes.GroupInputsLabelWrapper, inputType === "show" && "showView")}>
          <span onClick={() => inputType === "show" && setShow((p) => !p)}>
            <span className="label">{label}</span>
            {switchable && inputType !== "show" && <Switch checked={show} />}
            {inputType === "show" && <ArrayInputItemArrow className="icon" />}
          </span>
          {groupHelperText && inputType !== "show" && (
            <p className={classes.GroupHelperText}>{groupHelperText}</p>
          )}
        </div>
      )}
      <Collapse in={show} timeout="auto">
        {nodesWithoutBG}
        <div
          className={cn(
            classes.GroupInputWrapper,
            inputType === "show" && !onlyCreateView && "showView",
            className
          )}
        >
          {switchable ? (
            <>
              <div
                className={cn(
                  classes.GroupInputsItem,
                  "GroupInputsItem",
                  inputType === "show" && !onlyCreateView && "showView"
                )}
              >
                {children}
              </div>
            </>
          ) : (
            <div
              className={cn(
                classes.GroupInputsItem,
                "GroupInputsItem",
                inputType === "show" && !onlyCreateView && "showView"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export const GroupInputs: React.FC<GroupInputsProps> = ({ inputType, ...rest }) => (
  <GroupInputsOrigin inputType={inputType} {...rest} />
);
