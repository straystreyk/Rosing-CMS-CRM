import * as React from "react";
import { NumberInput as NumberInputInner } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { NumberInputShow } from "./show-view";
import { InputProps } from "../../input-types";
import { formHelperText } from "../../styles";

const useStyles = makeStyles({
  custom: {
    backgroundColor: "none !important",
    fontFamily: "var(--font-family)",
    "& input": {
      color: "var(--primary-text-default)",
      padding: "8px 12px",
      fontFamily: "var(--font-family)",
      lineHeight: "20px",
      fontSize: 14,
      border: "1px solid var(--secondary-color-default)",
      borderRadius: 4,
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& > p.MuiFormHelperText-root": formHelperText,
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      fontFamily: "var(--font-family)",
      fontWeight: 500,
      marginBottom: 5,
      lineHeight: "20px",
      color: "var(--secondary-color-main) !important",
    },
    "& div": {
      backgroundColor: "inherit",
      padding: "0 !important",
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

export const NumberInputOrigin: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  return (
    <>
      <NumberInputInner
        {...props}
        fullWidth
        placeholder={"Not filled in"}
        helperText={props.helperText ?? false}
        className={classes.custom}
      />
    </>
  );
};

export const NumberInput: React.FC<InputProps> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <NumberInputShow {...rest} />
  ) : (
    <NumberInputOrigin inputType={inputType} {...rest} />
  );
};
