import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { Menu, TextField } from "@material-ui/core";

import { RoundedFilterShow } from "../RoundedFilterShow";
import { MenuListProps, PaperProps } from "../constants";
import { DateFilterProps } from "../custom-filters-types";
import { StandardButton } from "../../UI/Buttons/standard-button";
import { AcceptFilterIcon, CancelFilterIcon, PlusIcon } from "../../../constants/icons";

export const DateFilter: React.FC<DateFilterProps> = ({ source, secondSource, label }) => {
  const { filterValues, setFilters, displayedFilters } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source, secondSource]), displayedFilters);
  }, [secondSource, displayedFilters, source, filterValues, setFilters]);

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
        onClose={handleClose}
        aria-haspopup="true"
        inputMode="text"
        MenuListProps={MenuListProps}
        PaperProps={PaperProps}
      >
        <div>
          <TextField
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <StandardButton
            startIcon={<AcceptFilterIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
          >
            Accept
          </StandardButton>
          <StandardButton
            startIcon={<CancelFilterIcon color="var(--primary-text-default)" />}
            variant="text"
            customColor="var(--primary-text-default)"
          >
            Cancel
          </StandardButton>
        </div>
      </Menu>
    </>
  );
};
