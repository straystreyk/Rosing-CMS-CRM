import * as React from "react";
import {
  ReferenceArrayInput as ReferenceArrayRA,
  ReferenceArrayInputProps,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { AutoCompleteInputStyles } from "../ArrayInputs/AutoCompliteArrayInput/styles";

const useStyles = makeStyles({ AutoCompleteInputStyles });

export const ReferenceArrayInput: React.FC<ReferenceArrayInputProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <ReferenceArrayRA options={{ className: classes.AutoCompleteInputStyles }} {...props}>
      {children}
    </ReferenceArrayRA>
  );
};
