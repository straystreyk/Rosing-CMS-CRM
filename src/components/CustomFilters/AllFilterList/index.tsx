import * as React from "react";
import { useListContext } from "react-admin";
import { Checkbox, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { SearchFiltersInput } from "../SearchFiltersInput";
import { AllFiltersListStyles } from "./styles";

const ITEM_HEIGHT = 32;
const useStyles = makeStyles(AllFiltersListStyles);

export const AllFiltersList: React.FC<{
  anchorEl: null | HTMLElement;
  initialFilters: any[];
  filteredFilters: any[];
  activeFilters: any[];
  handleMenuItemClick: (e: React.MouseEvent, index: number, filter: any) => void;
  handleClose: () => void;
  setFilteredFilters: any;
  open: boolean;
}> = ({
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
      inputMode="text"
      MenuListProps={{
        style: {
          width: "100%",
          padding: 0,
        },
      }}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 10,
          width: "32ch",
          padding: 15,
        },
      }}
    >
      <SearchFiltersInput initialFilters={initialFilters} setFilteredFilters={setFilteredFilters} />
      {filteredFilters && filteredFilters.length ? (
        filteredFilters.map((filter: any, index: number) => {
          return (
            <MenuItem
              className={classes.ListItem}
              key={index}
              aria-disabled={true}
              disabled={loading}
              value={filter.props ?? filter.value}
              onClick={(event) => handleMenuItemClick(event, index, filter)}
            >
              <Checkbox
                checked={activeFilters.includes(filter)}
                style={{ padding: 0 }}
                size="small"
                color="primary"
              />
              <span className="label">{filter.props ? filter.props.label : filter.name}</span>
            </MenuItem>
          );
        })
      ) : (
        <div>No more filters :(</div>
      )}
    </Menu>
  );
};
