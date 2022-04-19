import { ChoicesCustomFilter, ChoicesItem } from "../custom-filters-types";
import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";
import { SearchFilterStyles } from "./styles";

const useStyles = makeStyles(SearchFilterStyles);

interface SelectProps extends Omit<ChoicesCustomFilter, "choices"> {
  choices: ChoicesItem[];
}

const useSelectSearchFilter = ({
  source,
  initialValue,
}: {
  source: string;
  initialValue?: string;
}) => {
  const { filterValues, setFilters, displayedFilters } = useListContext();
  const [value, setValue] = React.useState(filterValues[source] ?? initialValue);

  React.useEffect(() => {
    if (!(source in filterValues)) {
      setFilters({ ...filterValues, [source]: initialValue }, displayedFilters);
    }
  }, []);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filterValues, [source]: event.target.value }, displayedFilters);
      setValue(event.target.value);
    },
    [displayedFilters, setFilters, filterValues, source]
  );

  return {
    handleChange,
    value,
  };
};

export const SelectSearchFilter: React.FC<SelectProps> = ({ choices, initialValue, source }) => {
  const classes = useStyles();
  const { value, handleChange } = useSelectSearchFilter({ source, initialValue });

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
        <MenuItem key={index} value={option.value.toString()}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
