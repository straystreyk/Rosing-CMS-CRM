import { AutocompleteArrayInput as StandardAutocompleteArrayInput } from "react-admin";
import * as React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core";
import { AutocompleteArrayInputProps } from "./type";
import { AutoCompleteInputStyles } from "./styles";
import { AutoCompleteArrayInputShow } from "./show-view";

const useStyles = makeStyles({ AutoCompleteInputStyles });

export const AutocompleteArrayInputOrigin: React.FC<AutocompleteArrayInputProps> = ({
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
        options={{
          className: cn(classes.AutoCompleteInputStyles, className && className),
        }}
        helperText={helperText ?? false}
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
