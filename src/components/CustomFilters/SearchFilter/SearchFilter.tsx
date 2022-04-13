import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";
import { SearchFilterStyles } from "./styles";
import {
  ChoicesCustomFilter,
  ChoicesItem,
  StandardCustomFilterProps,
} from "../custom-filters-types";
import { useTranslate } from "ra-core";

const useStyles = makeStyles(SearchFilterStyles);
const SEARCH_SELECT = [
  { value: "contains", name: "Matches incompletely" },
  { value: "equals", name: "Exactly matches" },
];

interface SelectProps extends Omit<ChoicesCustomFilter, "choices"> {
  choices: ChoicesItem[];
}

const Select: React.FC<SelectProps> = ({ choices, initialValue, source }) => {
  const { filterValues, setFilters } = useListContext();
  const classes = useStyles();
  const [value, setValue] = React.useState(filterValues[source] ?? initialValue);

  React.useEffect(() => {
    if (!Object.keys(filterValues).includes(source)) {
      setFilters({ ...filterValues, [source]: initialValue });
    }
  }, []);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filterValues, [source]: event.target.value });
      setValue(event.target.value);
    },
    [filterValues, source]
  );

  return (
    <TextField
      className={classes.SelectInput}
      select
      id="outlined-select-search"
      label=""
      value={value}
      onChange={handleChange}
    >
      {choices.map((option, index) => (
        <MenuItem
          key={index}
          value={option.value as string | number | readonly string[] | undefined}
        >
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

const SearchInputFilter: React.FC<StandardCustomFilterProps> = ({ source }) => {
  const classes = useStyles();
  const { filterValues, setFilters, resource } = useListContext();
  const translate = useTranslate();
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (Object.keys(filterValues).includes(source) && filterValues[source] !== inputValue) {
      setInputValue(() => filterValues[source]);
    }
  }, [filterValues]);

  const changeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(() => e.target.value);
      setFilters({ ...filterValues, [source]: e.target.value });
    },
    [filterValues]
  );

  return (
    <input
      className={classes.SearchInput}
      type="text"
      placeholder={`ID, slug or ${translate(
        ["resources", resource, "name"].join(".")
      ).toLowerCase()} name`}
      value={inputValue}
      onChange={changeInput}
    />
  );
};

export const SearchFilters = () => {
  const classes = useStyles();
  return (
    <div className={classes.SearchFilterWrapper}>
      <Select label="" source="searchRule" choices={SEARCH_SELECT} initialValue="contains" />
      <SearchInputFilter source="q" label="" />
    </div>
  );
};
