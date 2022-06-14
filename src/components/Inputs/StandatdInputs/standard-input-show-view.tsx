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
    "&.active > p": {
      display: "block",
    },
    "& img": {
      width: "100%",
    },
  },
});

export const StandardInputShowView: React.FC<{ label: string; className?: string }> = ({
  label,
  className,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.StandardShowWrapper}>
      <label>{label}</label>
      <div className={cn(classes.TextInputShowValue, className && className)}>{children}</div>
    </div>
  );
};
