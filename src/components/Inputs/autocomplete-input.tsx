import * as React from "react";
import { AutocompleteInput as AutocompleteInputRA, AutocompleteInputProps } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "./StandatdInputs/TextInput/styles";

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

export const AutocompleteInput: React.FC<AutocompleteInputProps> = (props) => {
  const classes = useStyles();
  return (
    <AutocompleteInputWithOpts
      fullWidth
      options={{ className: classes.AutocompleteInput }}
      {...props}
    />
  );
};
