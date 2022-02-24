import * as React from "react";
import { TextInput as TextInputInner } from "react-admin";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  custom: {
    backgroundColor: "none !important",
    "& input": {
      color: "#023864",
      padding: "8px 12px",
      lineHeight: "20px",
      fontSize: 14,
      border: "1px solid #9FA5A8",
      borderRadius: 4,
      transition: "0.35s border ease, 0.35s color ease",
      "&::placeholder": {
        color: "#9FA5A8 !important",
        opacity: "1 !important",
      },
      "&:hover": {
        borderColor: "#023864",
      },
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& .MuiInputAdornment-root": {
      position: "absolute",
      right: 10,
    },
    "& textarea": {
      lineHeight: "20px",
      fontSize: 14,
      border: "1px solid #9FA5A8",
      borderRadius: 4,
      transition: "0.35s border ease, 0.35s color ease",
      color: "#023864",
      padding: "8px 12px",
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
      color: "#D21C1C",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 5,
      lineHeight: "20px",
      fontFamily: "Gilroy, sans-serif",
      color: "#0F1F26 !important",
    },
    "& div": {
      backgroundColor: "inherit",
      padding: "0 !important",
      "&.Mui-error input": {
        borderColor: "#D21C1C",
      },
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

const TextInputOrigin: React.FC<InputProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <TextInputInner
        {...props}
        fullWidth={props.fullWidth ?? false}
        helperText={props.helperText ?? false}
        resettable={props.resettable ?? true}
        className={classes.custom}
      />
    </>
  );
};

export const TextInput: React.FC<InputProps> = ({ inputType, ...rest }) => {
  return ["create", "edit"].includes(inputType) ? <TextInputOrigin {...rest} /> : <div>asd</div>;
};
