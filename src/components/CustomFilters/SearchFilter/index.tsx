import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { SearchFilterStyles } from "./styles";
import { StandardCustomFilterProps } from "../custom-filters-types";
import { useTranslate } from "ra-core";
import { SelectSearchFilter } from "./select-search-filter";
import { LoopInputIcon } from "../constants";

const useStyles = makeStyles(SearchFilterStyles);

const SEARCH_SELECT = [
  { value: "contains", name: "Matches incompletely" },
  { value: "equals", name: "Exactly matches" },
];

const useSearchFilters = ({ source }: { source: string }) => {
  const { filterValues, setFilters, resource, displayedFilters } = useListContext();
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (source in filterValues && filterValues[source] !== inputValue) {
      setInputValue(() => filterValues[source]);
    }
  }, [filterValues, source]);

  const changeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(() => e.target.value);
      setFilters({ ...filterValues, [source]: e.target.value }, displayedFilters);
    },
    [source, displayedFilters, setFilters, filterValues]
  );

  return {
    changeInput,
    inputValue,
    resource,
  };
};

const SearchInputFilter: React.FC<StandardCustomFilterProps> = ({ source }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const { resource, inputValue, changeInput } = useSearchFilters({ source });

  return (
    <>
      <input
        className={classes.SearchInput}
        type="text"
        placeholder={`ID, slug or ${translate(
          ["resources", resource, "name"].join(".")
        ).toLowerCase()} name`}
        value={inputValue}
        onChange={changeInput}
      />
      <div className={classes.LoopIcon}>
        <LoopInputIcon color="var(--secondary-color-default)" />
      </div>
    </>
  );
};

export const SearchFilters = () => {
  const classes = useStyles();
  return (
    <div className={classes.SearchFilterWrapper}>
      <SelectSearchFilter
        label=""
        source="searchRule"
        choices={SEARCH_SELECT}
        initialValue="contains"
      />
      <SearchInputFilter source="q" label="" />
    </div>
  );
};
