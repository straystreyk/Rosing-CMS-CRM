import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { Menu, MenuItem } from "@material-ui/core";

import { StandardCustomFilterProps } from "../custom-filters-types";
import { RoundedFilterShow } from "../RoundedFilterShow";
import { MenuListProps, PaperProps } from "../constants";

interface DateFilterProps extends StandardCustomFilterProps {
  secondSource: string;
}

export const DateFilter: React.FC<DateFilterProps> = ({ source, secondSource, label }) => {
  const { filterValues, setFilters, loading, displayedFilters } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source, secondSource]), displayedFilters);
  }, [source, filterValues, setFilters]);

  return (
    <>
      <RoundedFilterShow
        handleClick={handleClick}
        deleteFilter={deleteFilter}
        source={source}
        secondSource={secondSource}
        label={label}
      />
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        aria-haspopup="true"
        inputMode="text"
        MenuListProps={MenuListProps}
        PaperProps={PaperProps}
      >
        <MenuItem aria-disabled={true} disabled={loading}></MenuItem>
      </Menu>
    </>
  );
};
