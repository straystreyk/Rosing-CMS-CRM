import * as React from "react";
import cn from "classnames";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { ChoicesItem } from "../custom-filters-types";
import { ArrowFilterIcon, DeleteFilterIcon } from "../constants";
import { DefaultRoundedFilterStyles } from "../styles";

const useStyles = makeStyles(DefaultRoundedFilterStyles);

export const RoundedFilterShow: React.FC<{
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  choices?: ChoicesItem[];
  deleteFilter: () => void;
  secondSource?: string;
  source: string;
  label: string;
}> = ({ handleClick, source, deleteFilter, label, choices, secondSource }) => {
  const classes = useStyles();
  const { filterValues } = useListContext();
  const isAlreadyIn = source in filterValues || (secondSource && secondSource in filterValues);

  const foundedFilter =
    source in filterValues && choices?.find((el) => el.value === filterValues[source]);

  return (
    <span className={cn(classes.RoundedFilter, isAlreadyIn && classes.RoundedFilterActive)}>
      <button onClick={handleClick}>
        <span className="label">{foundedFilter ? foundedFilter.name : label}</span>
        <ArrowFilterIcon
          color={!isAlreadyIn ? "var(--primary-focus)" : "var(--primary-button-default)"}
        />
      </button>
      {isAlreadyIn && (
        <button className="deleteButton" onClick={deleteFilter}>
          <DeleteFilterIcon color="var(--primary-button-default)" />
        </button>
      )}
    </span>
  );
};
