import * as React from "react";
import cn from "classnames";
import { FilterButton as FilterButtonRA } from "ra-ui-materialui";
import { FilterButtonProps as FilterButtonPropsRA } from "ra-ui-materialui/lib/list/filter/FilterButton";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  FilterButton: {
    "& button": {
      color: "var(--primary-button-default)",
      textTransform: "unset",
      fontFamily: "var(--font-family)",
    },
  },
  FilterButtonText: {
    "& button": {
      backgroundColor: "unset",
      "&:hover": {
        backgroundColor: "unset",
      },
    },
  },
});

interface FilterButtonProps extends FilterButtonPropsRA {
  variant: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ variant, color, ...props }) => {
  const classes = useStyles();

  return (
    <FilterButtonRA
      className={cn(classes.FilterButton, variant === "text" && classes.FilterButtonText)}
      {...props}
    />
  );
};
