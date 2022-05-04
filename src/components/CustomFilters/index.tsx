import * as React from "react";
import * as _ from "lodash";

import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { StandardButton } from "../UI/Buttons/standard-button";
import { DeleteIcon, PlusIcon } from "../../constants/icons";
import { CustomFiltersWrapperStyles } from "./styles";
import { SearchFilters } from "./SearchFilter";
import { AllFiltersList } from "./AllFilterList";
import { renderJsxElements } from "../../helpers/filters";
import { FilterTemplate } from "./custom-filters-types";

const useStyles = makeStyles(CustomFiltersWrapperStyles);

export const FilterContext = React.createContext<{
  setActiveFilters?: React.Dispatch<React.SetStateAction<FilterTemplate[]>>;
  setInitialFilters?: React.Dispatch<React.SetStateAction<FilterTemplate[]>>;
  filters?: FilterTemplate[];
}>({});

interface UseFiltersProps {
  initialFilters: FilterTemplate[];
  activeFilters: FilterTemplate[];
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterTemplate[]>>;
  setInitialFilters: React.Dispatch<React.SetStateAction<FilterTemplate[]>>;
  setFilteredFilters: React.Dispatch<React.SetStateAction<FilterTemplate[]>>;
}

const useFilters = ({
  initialFilters,
  activeFilters,
  setActiveFilters,
  setInitialFilters,
  setFilteredFilters,
}: UseFiltersProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { filterValues, setFilters, displayedFilters } = useListContext();

  React.useEffect(() => {
    initialFilters.forEach((filter) => {
      if (filter.source in filterValues || filter.defaultActive) {
        setActiveFilters((prev) => [...prev, filter]);
        if (filter.defaultActive) {
          setInitialFilters((prev) => prev.filter((initialFilter) => initialFilter !== filter));
          setFilteredFilters((prev) => prev.filter((initialFilter) => initialFilter !== filter));
        }
      }
    });
  }, []);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent, index: number, filter: FilterTemplate) => {
      if (activeFilters.includes(filter)) {
        setActiveFilters((prev) => prev.filter((el) => el !== filter));
        if (filter.source in filterValues) {
          setFilters(_.omit(filterValues, [filter.source]), displayedFilters);
        }
      } else {
        setActiveFilters(() => [...activeFilters, filter]);
      }
    },
    [setActiveFilters, displayedFilters, setFilters, activeFilters, filterValues]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  return {
    anchorEl,
    handleClick,
    handleClose,
    handleMenuItemClick,
  };
};

export const Filters: React.FC<{ filters?: FilterTemplate[] }> = ({ filters }) => {
  const classes = useStyles();
  const { filterValues, setFilters, displayedFilters } = useListContext();
  const [activeFilters, setActiveFilters] = React.useState<FilterTemplate[]>([]);
  const [initialFilters, setInitialFilters] = React.useState<FilterTemplate[]>(filters ?? []);
  const [filteredFilters, setFilteredFilters] = React.useState<FilterTemplate[]>(filters ?? []);
  const { anchorEl, handleClick, handleClose, handleMenuItemClick } = useFilters({
    initialFilters,
    setFilteredFilters,
    setActiveFilters,
    setInitialFilters,
    activeFilters,
  });

  const open = Boolean(anchorEl);
  const allActiveFiltersWithValue = Object.keys(filterValues).filter((el) => {
    if (el !== "q" && el !== "searchRule") {
      return el;
    }
  });

  const deleteAllFilters = React.useCallback(() => {
    setFilters(_.omit(filterValues, allActiveFiltersWithValue), displayedFilters);
  }, [setFilters, filterValues, allActiveFiltersWithValue, displayedFilters]);

  return (
    <div className={classes.CustomFiltersWrapper}>
      <SearchFilters />
      {initialFilters.length ? (
        <div className={classes.RoundedFiltersWrapper}>
          <FilterContext.Provider value={{ setActiveFilters, setInitialFilters, filters }}>
            {activeFilters.length
              ? renderJsxElements(activeFilters).map(
                  ({ Component, props: rest }, index: number) => <Component key={index} {...rest} />
                )
              : null}
          </FilterContext.Provider>

          <>
            <StandardButton
              variant="text"
              color="secondary"
              startIcon={<PlusIcon color="var(--primary-button-default)" />}
              className="filterButton"
              onClick={handleClick}
            >
              Add Filter
            </StandardButton>
            {allActiveFiltersWithValue.length !== 0 && (
              <StandardButton
                variant="text"
                startIcon={<DeleteIcon color="var(--additional-red-default)" />}
                customColor="var(--additional-red-default)"
                className="filterButton"
                onClick={deleteAllFilters}
              >
                Delete ({allActiveFiltersWithValue.length})
              </StandardButton>
            )}
            <AllFiltersList
              initialFilters={initialFilters}
              setFilteredFilters={setFilteredFilters as any}
              handleMenuItemClick={handleMenuItemClick as any}
              filteredFilters={filteredFilters}
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              activeFilters={activeFilters}
            />
          </>
        </div>
      ) : null}
    </div>
  );
};
