import * as React from "react";
import {
  RadioButtonGroupInput as RadioButtonGroupInputRA,
  RadioButtonGroupInputProps as RadioButtonGroupInputPropsRA,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { formHelperText, labelStyles } from "../styles";
import { RadioButtonGroupInputShow } from "./show-view";

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
    "& .MuiFormHelperText-root": formHelperText,
    "& legend": labelStyles,
  },
});

export interface RadioButtonGroupInputProps extends Omit<RadioButtonGroupInputPropsRA, "source"> {
  source: string;
}

export const RadioButtonGroupInputOrigin: React.FC<RadioButtonGroupInputProps> = ({
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

export const RadioButtonGroupInput: React.FC<RadioButtonGroupInputProps> = ({
  label,
  inputType,
  source,
  ...props
}) => {
  return (
    <>
      {inputType === "show" ? (
        <RadioButtonGroupInputShow source={source} inputType={inputType} label={label} {...props} />
      ) : (
        <RadioButtonGroupInputOrigin
          source={source}
          inputType={inputType}
          label={label}
          {...props}
        />
      )}
    </>
  );
};
