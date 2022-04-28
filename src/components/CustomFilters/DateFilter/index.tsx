import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { makeStyles, Menu, TextField } from "@material-ui/core";

import { RoundedFilterShow } from "../RoundedFilterShow";
import { DateFilterProps } from "../custom-filters-types";
import { StandardButton } from "../../UI/Buttons/standard-button";
import { AcceptFilterIcon, CancelFilterIcon } from "../../../constants/icons";
import { MenuListProps, PaperProps } from "../constants";
import { DateFilterStyles } from "./styles";

const useStyles = makeStyles(DateFilterStyles);

export const DateFilter: React.FC<DateFilterProps> = ({
  source,
  secondSource,
  label,
  defaultActive,
}) => {
  const { filterValues, setFilters, displayedFilters } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fromValue, setFromValue] = React.useState("");
  const [toValue, setToValue] = React.useState("");
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFromValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  const getToValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source, secondSource]), displayedFilters);
  }, [secondSource, displayedFilters, source, filterValues, setFilters]);

  return (
    <>
      <RoundedFilterShow
        handleClick={handleClick}
        deleteFilter={deleteFilter}
        defaultActive={defaultActive}
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
        <div className={classes.DateWrapper}>
          <TextField
            onChange={getFromValue}
            value={fromValue}
            className={classes.DateInput}
            id="date"
            type="date"
          />
          <TextField
            onChange={getToValue}
            value={toValue}
            className={classes.DateInput}
            id="date"
            type="date"
          />
        </div>
        <div className={classes.ButtonsWrapper}>
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
            onClick={handleClose}
          >
            Cancel
          </StandardButton>
        </div>
      </Menu>
    </>
  );
};
