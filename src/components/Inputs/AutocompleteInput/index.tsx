import * as React from "react";
import {
  AutocompleteInput as AutocompleteInputRA,
  AutocompleteInputProps as AutocompleteInputPropsRA,
} from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";
import { AutocompleteShow } from "./show-view";

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

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  inputType,
  helperText,
  ...rest
}) => {
  const classes = useStyles();
  return inputType === "show" ? (
    <AutocompleteShow {...rest} />
  ) : (
    <AutocompleteInputWithOpts
      fullWidth
      options={{ className: classes.AutocompleteInput }}
      helperText={helperText ?? false}
      {...rest}
    />
  );
};
