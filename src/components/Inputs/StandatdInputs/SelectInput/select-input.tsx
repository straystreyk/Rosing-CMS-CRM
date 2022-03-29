import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { SelectInput as SelectInputInner } from "react-admin";
import { SelectInputShow } from "./show-view";
import { labelStyles } from "../../styles";

type Props = React.ComponentProps<typeof SelectInputInner>;

const useStyles = makeStyles({
  SelectInput: {
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-root": {
      padding: "8px 12px",
      color: "var(--primary-text-default)",
      border: "1px solid var(--secondary-color-default)",
      borderRadius: 4,
      fontSize: 14,
    },
    "& > p.MuiFormHelperText-root": {
      color: "var(--secondary-color-default)",
      margin: 0,
      fontSize: 12,
      marginTop: 5,
      fontFamily: "Gilroy, sans-serif",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& label": labelStyles,
    "& div": {
      backgroundColor: "inherit",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "&:hover": {
        background: "none",
      },
      "&:focus": {
        background: "none",
      },
      "&:focus-within": {
        background: "none",
      },
    },
  },
});

export const SelectInputOrigin: React.FC<Props> = ({ inputType, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <SelectInputInner
        fullWidth
        options={{ className: classes.SelectInput }}
        helperText={props.helperText ? props.helperText : false}
        {...props}
      />
    </>
  );
};

export const SelectInput: React.FC<Props> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <SelectInputShow inputType={inputType} {...rest} />
  ) : (
    <SelectInputOrigin inputType={inputType} {...rest} />
  );
};
