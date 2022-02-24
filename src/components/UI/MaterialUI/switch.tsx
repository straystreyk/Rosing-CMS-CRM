import * as React from "react";
import { makeStyles, Switch as SwitchMaterial } from "@material-ui/core";

const useStyles = makeStyles({
  BooleanInput: {
    height: 16,
    padding: 0,
    width: 34,
    "& .MuiSwitch-thumb": {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    "& .MuiSwitch-switchBase": {
      top: 0,
      left: 0,
      padding: 2,
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

export const Switch: React.FC<{ checked?: boolean }> = ({ checked, ...props }) => {
  const classes = useStyles();

  return (
    <SwitchMaterial checked={checked} color="primary" className={classes.BooleanInput} {...props} />
  );
};
