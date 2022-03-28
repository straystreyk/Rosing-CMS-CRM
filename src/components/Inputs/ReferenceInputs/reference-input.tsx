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
}

const useStyles = makeStyles({
  custom: {
    "& > div": {
      backgroundColor: "inherit",
      border: "1px solid #9FA5A8",
      borderRadius: 4,
      "&:before": {
        display: "none",
      },
      "&:after": {
        display: "none",
      },
    },
    "& div.MuiSelect-root": {
      padding: "8px 12px",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      lineHeight: "20px",
      color: "var(--secondary-color-main) !important",
    },
    "& .MuiFormHelperText-root": {
      margin: 0,
      marginTop: 2,
    },
  },
});

export const ReferenceInput: React.FC<ReferenceInputProps> = (props) => {
  const classes = useStyles();

  return (
    <ReferenceInputAdmin
      {...props}
      className={classes.custom}
      label={props.label}
      source={props.source}
      reference={props.reference}
    >
      {props.children}
    </ReferenceInputAdmin>
  );
};
