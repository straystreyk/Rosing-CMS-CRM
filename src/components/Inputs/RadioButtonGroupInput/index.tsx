import * as React from "react";
import {
  RadioButtonGroupInput as RadioButtonGroupInputRA,
  RadioButtonGroupInputProps,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";

const useStyles = makeStyles({
  RadioButtonGroupInput: {
    "& .MuiRadio-root": {
      padding: 0,
      marginRight: 5,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.25rem",
    },
    "& label.MuiFormControlLabel-root": {
      marginLeft: -2,
    },
    "& span.MuiTypography-root": {
      ...labelStyles,
      marginBottom: "unset",
    },
    "& legend": labelStyles,
  },
});

export const RadioButtonGroupInput: React.FC<RadioButtonGroupInputProps> = ({
  label,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.RadioButtonGroupInput}>
      <RadioButtonGroupInputRA
        size="small"
        helperText={props.helperText ?? false}
        label={label}
        {...props}
      />
    </div>
  );
};
