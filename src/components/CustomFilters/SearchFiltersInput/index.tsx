import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { SearchFiltersInputStyles } from "./styles";
import { LoopInputIcon } from "../constants";
import { ChoicesItem, FilterTemplate } from "../custom-filters-types";

const useStyles = makeStyles(SearchFiltersInputStyles);

interface SearchFiltersInputProps {
  initialFilters: FilterTemplate[] | ChoicesItem[];
  setFilteredFilters: React.Dispatch<React.SetStateAction<FilterTemplate[] | ChoicesItem[]>>;
}

const isChoiceItem = (item: unknown): item is ChoicesItem => {
  return (item as ChoicesItem).value !== undefined;
};

const isChoiceItemArr = (arr: unknown[]): arr is ChoicesItem[] => arr.every(isChoiceItem);

export const SearchFiltersInput = React.forwardRef<HTMLDivElement, SearchFiltersInputProps>(
  ({ initialFilters, setFilteredFilters }, ref) => {
    const classes = useStyles();

    const searchFilters = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredFilters(() =>
          isChoiceItemArr(initialFilters)
            ? initialFilters.filter((filter) =>
                filter.name.toLowerCase().includes(e.target.value.toLowerCase())
              )
            : initialFilters.filter((filter) =>
                filter.label.toLowerCase().includes(e.target.value.toLowerCase())
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
        <div className={classes.LoopIcon}>
          <LoopInputIcon color="var(--secondary-color-default)" />
        </div>
      </div>
    );
  }
);
