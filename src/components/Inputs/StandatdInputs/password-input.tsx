import * as React from "react";
import { PasswordInput as PasswordInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  PasswordInput: {
    backgroundColor: "none !important",
    "& .MuiInputAdornment-root": {
      position: "absolute",
      right: 0,
    },
    "& input": {
      color: "var(--primary-text-default)",
      padding: "8px 12px",
      lineHeight: "20px",
      fontSize: 14,
      border: "1px solid var(--secondary-color-default)",
      borderRadius: 4,
      transition: "0.35s border ease, 0.35s color ease",
      "&:placeholder": {
        opacity: 1,
        color: "red",
      },
      "&:hover": {
        borderColor: "var(--primary-text-default)",
      },
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& > p.MuiFormHelperText-root": {
      margin: 0,
      marginTop: 2,
      color: "var(--primary-text-default)",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#D21C1C",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      lineHeight: "20px",
      fontFamily: "var(--font-family)",
      color: "var(--secondary-color-main) !important",
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

export const PasswordInput: React.FC<{
  source: string;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
}> = ({ source, helperText, ...props }) => {
  const classes = useStyles();

  return (
    <PasswordInputRA
      icon={<></>}
      className={classes.PasswordInput}
      source={source}
      helperText={helperText ?? false}
      {...props}
    />
  );
};
