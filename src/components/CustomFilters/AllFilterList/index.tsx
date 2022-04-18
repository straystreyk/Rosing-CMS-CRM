import * as React from "react";
import { useListContext } from "react-admin";
import { Checkbox, Menu, MenuItem, makeStyles } from "@material-ui/core";

import { SearchFiltersInput } from "../SearchFiltersInput";
import { AllFiltersListStyles } from "./styles";
import { MenuListProps, PaperProps } from "../constants";
import { ChoicesItem, FilterTemplate } from "../custom-filters-types";

const useStyles = makeStyles(AllFiltersListStyles);

const isChoiceItem = (item: ChoicesItem | FilterTemplate): item is ChoicesItem => {
  return (item as ChoicesItem).value !== undefined;
};

type HandleMenuItemClick = (
  e: React.MouseEvent,
  index: number,
  filter: FilterTemplate | ChoicesItem
) => void;

interface AllFiltersListProps {
  anchorEl: null | HTMLElement;
  initialFilters: FilterTemplate[] | ChoicesItem[];
  filteredFilters: FilterTemplate[] | ChoicesItem[];
  activeFilters: FilterTemplate[] | ChoicesItem[];
  handleMenuItemClick: HandleMenuItemClick;
  handleClose: () => void;
  setFilteredFilters: React.Dispatch<React.SetStateAction<ChoicesItem[] | FilterTemplate[]>>;
  open: boolean;
}

export const AllFiltersList: React.FC<AllFiltersListProps> = ({
  initialFilters,
  setFilteredFilters,
  filteredFilters,
  anchorEl,
  open,
  handleClose,
  activeFilters,
  handleMenuItemClick,
}) => {
  const classes = useStyles();
  const { loading } = useListContext();

  return (
    <Menu
      id="filter-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      aria-haspopup="true"
      inputMode="text"
      MenuListProps={MenuListProps}
      PaperProps={PaperProps}
    >
      <SearchFiltersInput initialFilters={initialFilters} setFilteredFilters={setFilteredFilters} />
      {filteredFilters && filteredFilters.length ? (
        filteredFilters.map((filter, index: number) => {
          return (
            <MenuItem
              className={classes.ListItem}
              key={index}
              aria-disabled={true}
              disabled={loading}
              value={isChoiceItem(filter) ? filter.value.toString() : filter.source}
              onClick={(event) => handleMenuItemClick(event, index, filter)}
            >
              <Checkbox
                checked={activeFilters.includes(filter as ChoicesItem & FilterTemplate)}
                size="small"
                color="primary"
                className={classes.Checkbox}
              />
              <span className="label">{isChoiceItem(filter) ? filter.name : filter.label}</span>
            </MenuItem>
          );
        })
      ) : (
        <div className={classes.EmptyFilterList}>No more filters :(</div>
      )}
    </Menu>
  );
};
