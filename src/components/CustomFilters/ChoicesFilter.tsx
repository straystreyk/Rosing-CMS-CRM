import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";

import { FilterContext } from "./index";
import { ChoicesCustomFilter } from "./custom-filters-types";
import { RoundedFilterShow } from "./RoundedFilterShow";

export const ChoicesFilter: React.FC<ChoicesCustomFilter> = ({ source, label, choices }) => {
  const { setFilters, filterValues, displayedFilters } = useListContext();
  const { setActiveFilters } = React.useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = React.useCallback(
    (value: string | boolean) => {
      setFilters({ ...filterValues, [source]: value }, displayedFilters);
      setAnchorEl(null);
    },
    [source, filterValues]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source]), displayedFilters);
  }, [source, filterValues, setActiveFilters, setFilters]);

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
