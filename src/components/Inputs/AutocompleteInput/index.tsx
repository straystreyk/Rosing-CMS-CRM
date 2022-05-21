import * as React from "react";
import {
  AutocompleteInput as AutocompleteInputRA,
  AutocompleteInputProps as AutocompleteInputPropsRA,
} from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";
import { AutocompleteShow } from "./show-view";
import { SyntheticEvent } from "react";

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

interface AutocompleteInputProps extends AutocompleteInputPropsRA {
  inputType: "create" | "edit" | "show";
}

const resetOnBackspace = (e: React.KeyboardEvent) => {
  if (e.code === "Backspace" || e.code === "Escape") {
    const resetButton = (e.target as any).parentElement.querySelector(
      "[class*=RaAutocompleteInput-clearButton]"
    );

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
  const classes = useStyles();
  return inputType === "show" ? (
    <AutocompleteShow {...rest} />
  ) : (
    <AutocompleteInputWithOpts
      fullWidth
      options={{
        className: classes.AutocompleteInput,
        onKeyDown: resetOnBackspace,
      }}
      helperText={helperText ?? false}
      resettable={resettable ?? true}
      {...rest}
    />
  );
};
