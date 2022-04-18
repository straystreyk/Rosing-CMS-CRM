import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";

import { ChoicesCustomFilter } from "./custom-filters-types";
import { RoundedFilterShow } from "./RoundedFilterShow";

const useChoiceFilter = ({ source }: { source: string }) => {
  const { setFilters, filterValues, displayedFilters } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = React.useCallback(
    (value: string | boolean) => {
      setFilters({ ...filterValues, [source]: value }, displayedFilters);
      setAnchorEl(null);
    },
    [setFilters, displayedFilters, source, filterValues]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source]), displayedFilters);
  }, [displayedFilters, source, filterValues, setFilters]);

  return {
    anchorEl,
    deleteFilter,
    handleClose,
    handleMenuItemClick,
    handleClick,
  };
};

export const ChoicesFilter: React.FC<ChoicesCustomFilter> = ({ source, label, choices }) => {
  const { filterValues } = useListContext();
  const { deleteFilter, anchorEl, handleClick, handleClose, handleMenuItemClick } = useChoiceFilter(
    { source }
  );
  const open = Boolean(anchorEl);

  return (
    <>
      <RoundedFilterShow
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
