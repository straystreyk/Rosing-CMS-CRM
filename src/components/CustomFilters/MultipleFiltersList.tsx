import * as React from "react";

import { ChoicesCustomFilter, ChoicesItem } from "./custom-filters-types";
import { FilterRounded } from "./ChoicesFilter";
import { authClient } from "../Providers";
import { useListContext } from "react-admin";
import { AllFiltersList } from "./AllFilterList";
import { MainLoader } from "../MainLoader";
import * as _ from "lodash";

const LOADER_SIZE = 20;

export const MultipleFiltersList: React.FC<ChoicesCustomFilter> = ({ label, source, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [choices, setChoices] = React.useState<[] | ChoicesItem[]>(props.choices ?? []);
  const [activeFilters, setActiveFilters] = React.useState<any>([]);
  const [filteredFilters, setFilteredFilters] = React.useState<any>(props.choices ?? []);
  const { setFilters, filterValues } = useListContext();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source]));
  }, [source, filterValues, setFilters]);

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent, index: number, filter: any) => {
      if (activeFilters.includes(filter)) {
        setActiveFilters((prev: any) => prev.filter((el: any) => el !== filter));
        setFilters({
          ...filterValues,
          [source]: filterValues[source].filter((el: any) => el !== filter.value),
        });
      } else {
        setActiveFilters((prev: any) => [...prev, filter]);
        if (filterValues[source] && filterValues[source].length) {
          setFilters({ ...filterValues, [source]: [...filterValues[source], filter.value] });
        } else {
          setFilters({ ...filterValues, [source]: [filter.value] });
        }
      }
    },
    [activeFilters, filterValues, source]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (!props.choices && props.query) {
      try {
        const getChoices = async () => {
          const res = await authClient.query({
            query: props.query,
            variables: {},
          });

          setChoices(res.data.items);
          setFilteredFilters(res.data.items);
        };
        getChoices();
      } catch (e) {
        if (e instanceof Error) {
        }
      }
    }
  }, []);

  React.useEffect(() => {
    choices.map((filter: any) => {
      if (filterValues[source] && filterValues[source].includes(filter.value)) {
        setActiveFilters((prev: any) => [...prev, filter]);
      }
    });
  }, [choices, filterValues, source]);

  if (!choices || !choices.length) return <MainLoader size={LOADER_SIZE} />;

  return (
    <>
      <FilterRounded
        label={label}
        source={source}
        handleClick={handleClick}
        choices={choices}
        deleteFilter={deleteFilter}
      />
      <AllFiltersList
        handleClose={handleClose}
        anchorEl={anchorEl}
        handleMenuItemClick={handleMenuItemClick}
        setFilteredFilters={setFilteredFilters}
        initialFilters={choices}
        activeFilters={activeFilters}
        filteredFilters={filteredFilters}
        open={open}
      />
    </>
  );
};
