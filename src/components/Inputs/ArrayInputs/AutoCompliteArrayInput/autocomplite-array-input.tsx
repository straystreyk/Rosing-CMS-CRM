import * as React from "react";
import {
  AutocompleteArrayInput as StandardAutocompleteArrayInput,
  AutocompleteArrayInputProps,
} from "react-admin";
import { makeStyles } from "@material-ui/core";

import { AutoCompleteInputStyles } from "./styles";
import { AutoCompleteArrayInputShow } from "./show-view";

const useStyles = makeStyles({ AutoCompleteInputStyles });

export const AutocompleteArrayInputOrigin: React.FC<any> = ({
  className,
  helperText,
  validate,
  source,
  choices,
  optionText,
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      <StandardAutocompleteArrayInput
        helperText={helperText ?? false}
        options={{ className: classes.AutoCompleteInputStyles }}
        validate={validate}
        source={source}
        choices={choices}
        optionText={optionText}
        fullWidth
        {...props}
      />
    </>
  );
};

export const AutocompleteArrayInput: React.FC<AutocompleteArrayInputProps> = ({
  inputType,
  ...props
}) => {
  return inputType === "show" ? (
    <AutoCompleteArrayInputShow {...props} />
  ) : (
    <AutocompleteArrayInputOrigin {...props} />
  );
};
