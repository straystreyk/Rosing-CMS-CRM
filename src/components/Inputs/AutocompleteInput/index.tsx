import * as React from "react";
import { AutocompleteInput as AutocompleteInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";
import { AutocompleteShow } from "./show-view";
import { AutocompleteInput as AutocompleteInputProps } from "../input-types";

export const AutocompleteInputWithOpts = AutocompleteInputRA as React.ComponentType<
  Omit<React.ComponentProps<typeof AutocompleteInputRA>, "emptyText"> & {
    options?: any;
  }
>;
const useStyles = makeStyles({
  AutocompleteInput: {
    ...TextInputStyles,
  },
});

export const AutocompleteInputOrigin: React.FC<Omit<AutocompleteInputProps, "inputType">> = ({
  helperText,
  resettable,
  options,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AutocompleteInputWithOpts
      {...rest}
      options={{
        className: classes.AutocompleteInput,
        onKeyDown: resetOnBackspace,
        ...options,
      }}
      helperText={helperText ?? false}
      resettable={resettable ?? true}
      fullWidth
    />
  );
};

const resetOnBackspace = (e: React.KeyboardEvent) => {
  if (e.code === "Backspace" || e.code === "Escape") {
    const resetButton = (e.target as any).parentElement.querySelector("button.MuiButtonBase-root");

    if (resetButton) {
      (resetButton as HTMLButtonElement).click();
    }
  }
};

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  inputType,
  helperText,
  resettable,
  ...rest
}) => {
  return inputType === "show" ? (
    <AutocompleteShow {...rest} inputType={inputType} resettable={resettable ?? true} />
  ) : (
    <AutocompleteInputOrigin resettable={resettable} helperText={helperText} {...rest} />
  );
};
