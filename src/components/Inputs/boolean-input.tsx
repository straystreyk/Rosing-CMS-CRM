import * as React from "react";
import { BooleanInput as DefaultBooleanInput } from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  BooleanInput: {
    "& .MuiSwitch-thumb": {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    "& .MuiSwitch-root": {
      height: 40,
    },
    "& .MuiSwitch-switchBase": {
      top: 5,
      left: 5,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(18px)",
    },
    "& .MuiSwitch-colorPrimary.Mui-checked": {
      color: "#fff",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      opacity: 1,
    },
    "& .MuiSwitch-track": {
      borderRadius: 10,
      opacity: 0.2,
    },
  },
});

export const BooleanInput: React.FC<{
  helperText?: string;
  source: string;
  options?: object;
  label?: string;
}> = ({ helperText, source, ...props }) => {
  const classes = useStyles();

  return (
    <DefaultBooleanInput
      {...props}
      source={source}
      helperText={helperText ?? ""}
      className={classes.BooleanInput}
    />
  );
};
