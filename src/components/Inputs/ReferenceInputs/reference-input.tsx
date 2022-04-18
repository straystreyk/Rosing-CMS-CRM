import React from "react";
import { ReferenceInput as ReferenceInputAdmin } from "react-admin";
import { makeStyles } from "@material-ui/core";

interface ReferenceInputProps {
  label?: string;
  source: string;
  reference: string;
  helperText?: string;
  children: React.PropsWithChildren<JSX.Element>;
  perPage?: number;
  checkBoxLabel?: string;
  allowEmpty?: boolean;
  enableGetChoices?: (q: string) => boolean;
  resource?: string;
}

const useStyles = makeStyles({
  custom: {},
});

export const ReferenceInput: React.FC<ReferenceInputProps> = (props) => {
  const classes = useStyles();

  return (
    <ReferenceInputAdmin
      {...props}
      label={props.label}
      source={props.source}
      reference={props.reference}
    >
      {props.children}
    </ReferenceInputAdmin>
  );
};
