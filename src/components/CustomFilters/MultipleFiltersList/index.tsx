import * as React from "react";

import { ChoicesCustomFilter, ChoicesItem } from "../custom-filters-types";
import { AllFiltersList } from "../AllFilterList";
import { MainLoader } from "../../MainLoader";
import { useMultipleFiltersList } from "./use-multiple-filters-list";
import { RoundedFilterShow } from "../RoundedFilterShow";

const LOADER_SIZE = 20;

export const MultipleFiltersList: React.FC<ChoicesCustomFilter> = ({
  label,
  source,
  query,
  ...rest
}) => {
  const [choices, setChoices] = React.useState<[] | ChoicesItem[]>(rest.choices ?? []);
  const [activeFilters, setActiveFilters] = React.useState<[] | ChoicesItem[]>([]);
  const [filteredFilters, setFilteredFilters] = React.useState<[] | ChoicesItem[]>(
    rest.choices ?? []
  );

  const { anchorEl, handleClick, handleClose, deleteFilter, handleMenuItemClick, loading } =
    useMultipleFiltersList({
      setChoices,
      setFilteredFilters,
      setActiveFilters,
      activeFilters,
      choices,
      query,
      source,
    });

  const open = Boolean(anchorEl);

  if (loading) return <MainLoader size={LOADER_SIZE} />;
  if (!choices || !choices.length) return <span>No filters</span>;

  return (
    <>
      <RoundedFilterShow
        label={label}
        source={source}
        handleClick={handleClick}
        choices={choices}
        deleteFilter={deleteFilter}
      />
      <AllFiltersList
        handleClose={handleClose}
        anchorEl={anchorEl}
        handleMenuItemClick={handleMenuItemClick as any}
        setFilteredFilters={setFilteredFilters as any}
        initialFilters={choices}
        activeFilters={activeFilters}
        filteredFilters={filteredFilters}
        open={open}
      />
    </>
  );
};
