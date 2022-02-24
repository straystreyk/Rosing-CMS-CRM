import * as React from "react";
import { SelectArrayInput as SelectArrayInputDefault } from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  SelectArrayInput: {},
});

export const SelectArrayInput: React.FC<{ optionText: string }> = ({
  optionText,
  ...props
}) => {
  const classes = useStyles();

  return (
    <SelectArrayInputDefault
      options={{ className: classes.SelectArrayInput }}
      optionText={optionText}
      {...props}
    />
  );
};
