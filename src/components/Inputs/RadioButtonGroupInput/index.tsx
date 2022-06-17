import * as React from "react";
import cn from "classnames";
import { RadioButtonGroupInput as RadioButtonGroupInputRA } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { formHelperText, labelStyles } from "../styles";
import { RadioButtonGroupInputShow } from "./show-view";
import { InputProps } from "../input-types";

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
      color: "var(--primary-text-default)",
      fontWeight: 400,
      marginBottom: "unset",
    },
    "& .MuiFormHelperText-root": formHelperText,
    "& legend": labelStyles,
    "&.hideLabel legend": {
      display: "none",
    },
  },
});

export const RadioButtonGroupInputOrigin: React.FC<InputProps> = ({ label, ...props }) => {
  const classes = useStyles();

  return (
    <div className={cn(classes.RadioButtonGroupInput, !label && "hideLabel")}>
      <RadioButtonGroupInputRA
        size="small"
        helperText={props.helperText ?? false}
        label={label}
        {...props}
      />
    </div>
  );
};

export const RadioButtonGroupInput: React.FC<InputProps> = ({
  label,
  inputType,
  source,
  style,
  ...props
}) => {
  return (
    <>
      {inputType === "show" ? (
        <RadioButtonGroupInputShow source={source} inputType={inputType} label={label} {...props} />
      ) : (
        <RadioButtonGroupInputOrigin
          source={source}
          style={style}
          inputType={inputType}
          label={label}
          {...props}
        />
      )}
    </>
  );
};
