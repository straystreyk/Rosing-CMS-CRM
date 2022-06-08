import * as React from "react";
import cn from "classnames";

import { Switch } from "../UI/MaterialUI/switch";
import { makeStyles } from "@material-ui/core";
import { GroupInputsShow } from "./show-view";

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
    padding: "5px 12px",
    marginTop: 8,
    backgroundColor: "var(--primary-bg)",
    borderRadius: 4,
    "&.showView": {
      backgroundColor: "transparent",
      padding: "5px 0px 0px 12px",
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
  },
  GroupInputsLabelWrapper: {
    fontSize: 14,
    fontFamily: "var(--font-family)",
    fontWeight: 500,
    marginTop: 8,
    lineHeight: "20px",
    display: "inline-block",
    marginBottom: 5,
    "& > span": {
      marginRight: 5,
    },
  },
  GroupHelperText: {
    fontFamily: "var(--font-family)",
    fontSize: 12,
    color: "var(--secondary-color-default)",
    lineHeight: "16px",
  },
});

interface GroupInputsProps {
  label?: string;
  initialView?: boolean;
  switchable?: boolean;
  groupHelperText?: string;
  className?: string;
  inputType?: string;
  source?: string;
  resource?: string;
  index?: number | string;
}

export const GroupInputsOrigin: React.FC<GroupInputsProps> = ({
  label,
  children,
  initialView,
  switchable,
  className,
  inputType,
  groupHelperText,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(
    initialView || (inputType && ["show", "edit"].includes(inputType)) || false
  );

  return (
    <>
      <div>
        {label && (
          <>
            <span
              style={{ cursor: switchable && inputType !== "show" ? "pointer" : "" }}
              onClick={() => setShow((p) => (inputType !== "show" ? !p : p))}
              className={classes.GroupInputsLabelWrapper}
            >
              <span>{label && label} </span>
              {switchable && inputType !== "show" && <Switch checked={show} />}
            </span>
            {groupHelperText && inputType !== "show" && (
              <p className={classes.GroupHelperText}>{groupHelperText}</p>
            )}
          </>
        )}
      </div>
      <div className={cn(classes.GroupInputWrapper, className)}>
        {switchable ? (
          <>
            {show && (
              <div className={cn(classes.GroupInputs, inputType === "show" && "showView")}>
                {children}
              </div>
            )}
          </>
        ) : (
          <div className={cn(classes.GroupInputs, inputType === "show" && "showView")}>
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export const GroupInputs: React.FC<GroupInputsProps> = (props) => {
  return props.inputType && props.inputType === "show" ? (
    <GroupInputsShow {...props} />
  ) : (
    <GroupInputsOrigin {...props} />
  );
};
