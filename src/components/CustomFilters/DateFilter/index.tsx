import * as React from "react";
import * as _ from "lodash";
import { useListContext } from "react-admin";
import { makeStyles, Menu, TextField } from "@material-ui/core";

import { RoundedFilterShow } from "../RoundedFilterShow";
import { StandardCustomFilterProps } from "../custom-filters-types";
import { StandardButton } from "../../UI/Buttons/standard-button";
import { AcceptFilterIcon, CancelFilterIcon } from "../../../constants/icons";
import { MenuListProps, PaperProps } from "../constants";
import { DateFilterStyles } from "./styles";

const useStyles = makeStyles(DateFilterStyles);

const useDateFilter = ({ source }: { source: string }) => {
  const { filterValues, setFilters, displayedFilters } = useListContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fromValue, setFromValue] = React.useState(
    filterValues[source] && filterValues[source].from ? filterValues[source].from : ""
  );
  const [toValue, setToValue] = React.useState(
    filterValues[source] && filterValues[source].to ? filterValues[source].to : ""
  );

  React.useEffect(() => {
    if (!(source in filterValues)) {
      setFromValue("");
      setToValue("");
    }
  }, [filterValues, source]);

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
    setFilters(_.omit(filterValues, [source]), displayedFilters);
  }, [displayedFilters, source, filterValues, setFilters]);

  const acceptFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fromValue || toValue) {
      const filter: { from?: string; to?: string } = {};
      if (fromValue) filter.from = fromValue;
      if (toValue) filter.to = toValue;
      setFilters({ ...filterValues, [source]: filter }, displayedFilters);
      handleClose();
    }
  };

  return {
    deleteFilter,
    acceptFilter,
    getToValue,
    getFromValue,
    handleClick,
    handleClose,
    anchorEl,
    fromValue,
    toValue,
  };
};

export const DateFilter: React.FC<StandardCustomFilterProps> = ({
  source,
  label,
  defaultActive,
}) => {
  const {
    anchorEl,
    handleClose,
    getFromValue,
    getToValue,
    handleClick,
    fromValue,
    toValue,
    deleteFilter,
    acceptFilter,
  } = useDateFilter({ source });
  const classes = useStyles();
  const open = Boolean(anchorEl);

  return (
    <>
      <RoundedFilterShow
        handleClick={handleClick}
        deleteFilter={deleteFilter}
        defaultActive={defaultActive}
        source={source}
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
            label="From"
            id="date"
            type="date"
          />
          <TextField
            onChange={getToValue}
            value={toValue}
            className={classes.DateInput}
            label="To"
            id="date"
            type="date"
          />
        </div>
        <div className={classes.ButtonsWrapper}>
          <StandardButton
            startIcon={<AcceptFilterIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
            onClick={acceptFilter}
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
