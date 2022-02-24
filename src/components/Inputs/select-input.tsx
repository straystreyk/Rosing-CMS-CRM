import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { SelectInput as SelectInputInner } from "react-admin";

type Props = React.ComponentProps<typeof SelectInputInner>;

const useStyles = makeStyles({
  SelectInput: {
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
      border: "1px solid #9FA5A8",
      borderRadius: 4,
    },
    "& .MuiSelect-root": {
      padding: "8px 12px",
      color: "#023864",
      fontSize: 14,
    },
    "& > p.MuiFormHelperText-root": {
      margin: 0,
      marginTop: 2,
      color: "#023864",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      lineHeight: "20px",
      color: "#0F1F26 !important",
    },
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

export const SelectInput: React.FC<Props> = (props) => {
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
