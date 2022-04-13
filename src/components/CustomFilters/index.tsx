import * as React from "react";
import * as _ from "lodash";

import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { StandardButton } from "../UI/Buttons/standard-button";
import { PlusIcon } from "../../constants/icons";
import { CustomFiltersWrapperStyles } from "./styles";
import { SearchFilters } from "./SearchFilter/SearchFilter";
import { AllFiltersList } from "./AllFilterList";

const useStyles = makeStyles(CustomFiltersWrapperStyles);

export const FilterContext = React.createContext<any>({});

export const Filters: React.FC<{ filters: any }> = ({ filters }) => {
  const { filterValues, setFilters } = useListContext();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeFilters, setActiveFilters] = React.useState<any>([]);
  const [initialFilters, setInitialFilters] = React.useState<any>(filters);
  const [filteredFilters, setFilteredFilters] = React.useState<any>(filters);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    initialFilters.map((filter: any) => {
      if (Object.keys(filterValues).includes(filter.props.source) || filter.props.defaultActive) {
        setActiveFilters((prev: any) => [...prev, filter]);
        if (filter.props.defaultActive) {
          setInitialFilters((prev: any) =>
            prev.filter((initialFilter: any) => initialFilter !== filter)
          );
          setFilteredFilters((prev: any) =>
            prev.filter((initialFilter: any) => initialFilter !== filter)
          );
        }
      }
    });
  }, []);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent, index: number, filter: any) => {
      if (activeFilters.includes(filter)) {
        setActiveFilters((prev: any) => prev.filter((el: any) => el !== filter));
        if (Object.keys(filterValues).includes(filter.props.source)) {
          setFilters(_.omit(filterValues, [filter.props.source]));
        }
      } else {
        setActiveFilters(() => [...activeFilters, filter]);
      }
    },
    [activeFilters, filterValues]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.CustomFiltersWrapper}>
      <SearchFilters />
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
        <AllFiltersList
          initialFilters={initialFilters}
          setFilteredFilters={setFilteredFilters}
          filteredFilters={filteredFilters}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          activeFilters={activeFilters}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
    </div>
  );
};
