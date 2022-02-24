import * as React from "react";
import { SearchInput as SearchInputRA } from "react-admin";
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
      "&:hover": {
        borderColor: "#023864",
      },
      "&:focus": {
        outline: "2px solid #7FC5FF",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      lineHeight: "20px",
      fontFamily: "Gilroy, sans-serif",
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

export const SearchInput = ({ ...props }) => {
  const classes = useStyles();
  return <SearchInputRA className={classes.custom} {...props} />;
};
