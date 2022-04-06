import * as React from "react";
import {
  CheckboxGroupInput as CheckboxGroupInputRA,
  CheckboxGroupInputProps,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../../styles";

const useStyles = makeStyles({
  CheckBoxGroupInput: {
    "& legend": labelStyles,
    "& label": {
      marginLeft: -2,
      "& span": {
        padding: 0,
        height: "unset",
        "& svg": {
          width: 21,
          height: 21,
        },
      },
      "& span.MuiTypography-root": {
        fontFamily: "Gilroy, sans-serif",
        fontSize: 14,
        lineHeight: "20px",
        color: "var(--primary-text-default)",
        marginLeft: 5,
      },
    },
  },
});

export const CheckboxGroupInput: React.FC<CheckboxGroupInputProps> = ({ helperText, ...props }) => {
  const classes = useStyles();
  return (
    <CheckboxGroupInputRA
      className={classes.CheckBoxGroupInput}
      helperText={helperText ?? false}
      {...props}
    />
  );
};
