import * as React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { labelStyles, TextInputShowValue } from "../styles";

const useStyles = makeStyles({
  StandardShowWrapper: {
    "& label": labelStyles,
  },
  TextInputShowValue: {
    ...TextInputShowValue,
    "& > p": {
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 3,
      overflow: "hidden",
    },
    "& img": {
      width: "100%",
    },
  },
});

type StandardInputShowViewType = {
  label?: {
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
  };
};

export const StandardInputShowView: React.FC<{
  label?: string;
  className?: string;
  wrapperClassName?: string;
  options?: StandardInputShowViewType;
}> = ({ label, className, options, wrapperClassName, children }) => {
  const classes = useStyles();
  return (
    <div
      className={cn(
        classes.StandardShowWrapper,
        "StandardShowWrapper",
        wrapperClassName && wrapperClassName
      )}
    >
      {label && (
        <label className={options?.label?.className} onClick={options?.label?.onClick}>
          {label} {options?.label?.icon}
        </label>
      )}
      <div className={cn(classes.TextInputShowValue, "TextInputShowValue", className && className)}>
        {children}
      </div>
    </div>
  );
};
