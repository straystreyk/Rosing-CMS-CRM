import * as React from "react";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";
import { makeStyles, Checkbox } from "@material-ui/core";

import { StandardButton } from "../UI/Buttons/standard-button";
import { PlusIcon } from "../../constants/icons";
import { RoundedFiltersWrapperStyles } from "./styles";

const useStyles = makeStyles(RoundedFiltersWrapperStyles);
const ITEM_HEIGHT = 32;

export const FilterContext = React.createContext<any>({});

export const Filters: React.FC<{ filters: React.ReactElement[] }> = ({ children, filters }) => {
  const { filterValues } = useListContext();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeFilters, setActiveFilters] = React.useState<any>([]);
  const [initialFilters, setInitialFilters] = React.useState<any>(filters);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    initialFilters.map((filter: any) => {
      if (filterValues[filter.props.source] || filter.props.defaultActive) {
        setActiveFilters(() => [...activeFilters, filter]);
        setInitialFilters(() =>
          initialFilters.filter((initialFilter: any) => initialFilter !== filter)
        );
      }
    });
  }, []);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent, index: number, filter: React.ReactElement) => {
      if (activeFilters.includes(filter)) {
        setActiveFilters((prev: any) => prev.filter((el: any) => el !== filter));
      } else {
        setActiveFilters(() => [...activeFilters, filter]);
      }
    },
    [activeFilters]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.RoundedFiltersWrapper}>
      <FilterContext.Provider value={{ setActiveFilters, setInitialFilters, filters }}>
        {activeFilters.length
          ? activeFilters.map((filter: any, index: number) => (
              <React.Fragment key={index}>{filter}</React.Fragment>
            ))
          : null}
      </FilterContext.Provider>
      <StandardButton
        variant="text"
        color="secondary"
        startIcon={<PlusIcon color="var(--primary-button-default)" />}
        className="filterButton"
        onClick={handleClick}
      >
        Add Filter
      </StandardButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-menu",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 10,
            width: "35ch",
          },
        }}
      >
        {initialFilters.length ? (
          initialFilters.map((filter: React.ReactElement, index: number) => {
            return (
              <MenuItem
                className={classes.ListItem}
                key={index}
                onClick={(event) => handleMenuItemClick(event, index, filter)}
              >
                <Checkbox
                  checked={activeFilters.includes(filter)}
                  style={{ padding: 0 }}
                  size="small"
                  color="primary"
                />
                <span className="label">{filter.props.label}</span>
              </MenuItem>
            );
          })
        ) : (
          <span>No more filters :(</span>
        )}
      </Menu>
    </div>
  );
};
