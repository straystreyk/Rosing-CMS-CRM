import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { SearchFiltersInputStyles } from "./styles";

const useStyles = makeStyles(SearchFiltersInputStyles);

export const SearchFiltersInput = React.forwardRef<
  HTMLDivElement,
  {
    initialFilters: {}[];
    setFilteredFilters: any;
  }
>(({ initialFilters, setFilteredFilters }, ref) => {
  const classes = useStyles();

  const searchFilters = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilteredFilters(() =>
        initialFilters.filter((filter: any) =>
          filter.label
            ? filter.label.toLowerCase().includes(e.target.value.toLowerCase())
            : filter.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    },
    [setFilteredFilters, initialFilters]
  );

  return (
    <div className={classes.SearchFilterInputWrapper} ref={ref}>
      <input
        placeholder="Start typing to search"
        className={classes.SearchFilterInput}
        autoFocus
        type="text"
        onChange={searchFilters}
      />
    </div>
  );
});
