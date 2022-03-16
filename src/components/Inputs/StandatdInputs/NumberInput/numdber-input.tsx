import * as React from "react";
import { NumberInput as NumberInputInner } from "react-admin";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { TextInputShow } from "../TextInput/show-view";
import { TextInputOrigin } from "../TextInput/text-input";
import { NumberInputShow } from "./show-view";

const useStyles = makeStyles({
  custom: {
    backgroundColor: "none !important",
    fontFamily: "Gilroy, sans-serif",
    "& input": {
      color: "#023864",
      padding: "8px 12px",
      fontFamily: "Gilroy, sans-serif",
      lineHeight: "20px",
      fontSize: 14,
      border: "1px solid #9FA5A8",
      borderRadius: 4,
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& > p.MuiFormHelperText-root": {
      margin: 0,
      marginTop: 5,
      fontSize: 12,
      fontFamily: "Gilroy, sans-serif",
      color: "#9FA5A8",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      marginBottom: 5,
      lineHeight: "20px",
      color: "#0F1F26 !important",
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
  return inputType === "show" ? <NumberInputShow {...rest} /> : <NumberInputOrigin {...rest} />;
};
