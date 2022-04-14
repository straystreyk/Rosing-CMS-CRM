import * as React from "react";
import { SearchInput as SearchInputRA, SearchInputProps } from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  SearchInput: {
    padding: "9.2px 12px",
    border: "1px solid var(--secondary-color-default)",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#fff",
    width: "100%",
    "& .MuiFormHelperText-root": {
      display: "none",
    },
    "& .MuiInputBase-input": {
      padding: 0,
      fontSize: 14,
      fontFamily: "Gilroy, sans-serif",
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

export const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const classes = useStyles();
  return <SearchInputRA className={classes.SearchInput} {...props} />;
};
