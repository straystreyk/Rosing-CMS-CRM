import * as React from "react";
import * as _ from "lodash";
import cn from "classnames";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { FilterContext } from "./index";
import { ChoicesCustomFilter, ChoicesItem } from "./custom-filters-types";
import { ArrowFilterIcon, DeleteFilterIcon } from "./constants";
import { DefaultRoundedFilterStyles } from "./styles";

const useStyles = makeStyles({ ...DefaultRoundedFilterStyles });

export const FilterRounded: React.FC<{
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  choices: ChoicesItem[] | undefined;
  deleteFilter: () => void;
  source: string;
  label: string;
}> = ({ handleClick, source, deleteFilter, label, choices }) => {
  const classes = useStyles();
  const { filterValues } = useListContext();
  const isAlreadyIn = Object.keys(filterValues).includes(source);

  return (
    <span className={cn(classes.RoundedFilter, isAlreadyIn && classes.RoundedFilterActive)}>
      <button onClick={handleClick}>
        <span className="label">
          {Object.keys(filterValues).includes(source) &&
          choices &&
          !!choices.find((el) => el.value === filterValues[source]) ? (
            <>{choices.filter((el) => el.value === filterValues[source])[0].name}</>
          ) : (
            <>{label}</>
          )}
        </span>{" "}
        <ArrowFilterIcon
          color={!isAlreadyIn ? "var(--primary-focus)" : "var(--primary-button-default)"}
        />
      </button>
      {isAlreadyIn && (
        <button className="deleteButton" onClick={deleteFilter}>
          <DeleteFilterIcon color="var(--primary-button-default)" />
        </button>
      )}
    </span>
  );
};

export const ChoicesFilter: React.FC<ChoicesCustomFilter> = ({ source, label, choices }) => {
  const { setFilters, filterValues } = useListContext();
  const { setActiveFilters } = React.useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = React.useCallback(
    (value: string | boolean) => {
      setFilters({ ...filterValues, [source]: value });
      setAnchorEl(null);
    },
    [source, filterValues]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source]));
  }, [source, filterValues, setActiveFilters, setFilters]);

  return (
    <>
      <FilterRounded
        deleteFilter={deleteFilter}
        label={label}
        source={source}
        handleClick={handleClick}
        choices={choices}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {choices &&
          choices.map((el) => {
            return (
              <MenuItem
                selected={filterValues[source] === el.value}
                onClick={() => handleMenuItemClick(el.value)}
                key={el.value.toString()}
              >
                {el.name}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};
