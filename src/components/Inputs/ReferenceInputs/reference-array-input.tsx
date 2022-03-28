import * as React from "react";
import { ReferenceArrayInput as ReferenceArrayInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";

interface ReferenceArrayInputProps {
  reference: string;
  source: string;
  helperText?: string;
  label?: string;
}

const useStyles = makeStyles((theme) => ({
  ReferenceArrayInput: {
    backgroundColor: "transparent",
    borderRadius: 4,
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
      border: "1px solid #9FA5A8",
      paddingLeft: 4,
      borderRadius: 4,
      "& > div": {
        margin: 0,
      },
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      lineHeight: "20px",
      color: "var(--secondary-color-main) !important",
    },
    "& input": {
      padding: "8px 12px",
    },
    "& .MuiChip-root": {
      background: "#F2FDFB",
      border: "1px solid var(--accent-color)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      color: theme.palette.primary.main,
      borderRadius: 4,
    },
    "& .MuiSvgIcon-root path": {
      color: theme.palette.primary.main,
    },
    "& > p.MuiFormHelperText-contained": {
      fontSize: 12,
      margin: "5px 0px 0px 0px",
      color: "#9FA5A8",
      fontFamily: "Gilroy, sans-serif",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& div": {
      backgroundColor: "inherit",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "&:focus-within": {
        background: "none",
      },
    },
  },
}));

export const ReferenceArrayInput: React.FC<ReferenceArrayInputProps> = ({
  children,
  helperText,
  ...props
}) => {
  const classes = useStyles();

  return (
    <ReferenceArrayInputRA
      options={{ className: classes.ReferenceArrayInput }}
      helperText={helperText ?? false}
      {...props}
    >
      {children}
    </ReferenceArrayInputRA>
  );
};
