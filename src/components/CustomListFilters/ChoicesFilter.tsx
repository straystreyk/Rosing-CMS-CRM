import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { FilterContext } from "./index";
import { ChoicesCustomFilter } from "./custom-filters-types";
import { ArrowFilterIcon, DeleteFilterIcon } from "./constants";
import cn from "classnames";
import { DefaultRoundedFilterStyles } from "./styles";

const useStyles = makeStyles({ ...DefaultRoundedFilterStyles });

const FilterRounded: React.FC<{
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteFilter: () => void;
  source: string;
  label: string;
}> = ({ handleClick, source, deleteFilter, label }) => {
  const classes = useStyles();
  const { filterValues } = useListContext();
  const isAlreadyIn = Object.keys(filterValues).includes(source);

  return (
    <span className={cn(classes.RoundedFilter, isAlreadyIn && classes.RoundedFilterActive)}>
      <button onClick={handleClick}>
        {label}{" "}
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

export const ChoicesFilter: React.FC<ChoicesCustomFilter> = ({
  source,
  label,
  choices,
  defaultActive,
}) => {
  const { setFilters, filterValues } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setActiveFilters, setInitialFilters, filters } = React.useContext(FilterContext);
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
    // if (!defaultActive) {
    //   setActiveFilters((prev: any) => prev.filter((el: any) => el.props.source !== source));
    // }
  }, [source, filterValues, setActiveFilters, setFilters]);

  return (
    <>
      <FilterRounded
        deleteFilter={deleteFilter}
        label={label}
        source={source}
        handleClick={handleClick}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {choices.map((el) => {
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
