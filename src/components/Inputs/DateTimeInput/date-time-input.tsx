import * as React from "react";
import { InputProps } from "ra-core";
import { DateTimeInput as DateTimeInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";
import { DateTimeInputShow } from "./show-view";

const useStyles = makeStyles({ TextInputStyles });

export const DateTimeInputOrigin: React.FC<InputProps> = ({
  source,
  resource,
  helperText,
  fullWidth,
  ...props
}) => {
  const classes = useStyles();

  return (
    <DateTimeInputRA
      options={{ className: classes.TextInputStyles }}
      helperText={helperText ?? false}
      source={source}
      resource={resource}
      fullWidth={fullWidth ?? false}
      {...props}
    />
  );
};

export const DateTimeInput: React.FC<InputProps> = ({
  source,
  resource,
  helperText,
  inputType,
  fullWidth,
  ...props
}) => {
  const classes = useStyles();

  return inputType === "show" ? (
    <DateTimeInputShow source={source} resource={resource} helperText={helperText} {...props} />
  ) : (
    <DateTimeInputOrigin
      fullWidth={fullWidth ?? true}
      source={source}
      resource={resource}
      helperText={helperText ?? false}
      {...props}
    />
  );
};
