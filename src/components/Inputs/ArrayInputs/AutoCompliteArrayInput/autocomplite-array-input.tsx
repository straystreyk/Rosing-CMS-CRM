import * as React from "react";
import { AutocompleteArrayInput as StandardAutocompleteArrayInput } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { AutoCompleteInputStyles } from "./styles";
import { AutoCompleteArrayInputShow } from "./show-view";
import { InputProps } from "../../input-types";

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

export const AutocompleteArrayInput: React.FC<InputProps> = ({ inputType, ...props }) => {
  return inputType === "show" ? (
    <AutoCompleteArrayInputShow inputType={inputType} {...props} />
  ) : (
    <AutocompleteArrayInputOrigin {...props} />
  );
};
