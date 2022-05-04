import * as React from "react";
import cn from "classnames";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";

import { ChoicesItem } from "../custom-filters-types";
import { ArrowFilterIcon, DeleteFilterIcon, PinIcon } from "../constants";
import { DefaultRoundedFilterStyles } from "./styles";

const useStyles = makeStyles(DefaultRoundedFilterStyles);

interface RoundedFilterShowProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  defaultActive?: boolean;
  choices?: ChoicesItem[];
  deleteFilter: () => void;
  source: string;
  label: string;
}

const useRoundedFilter = ({ source, choices }: { source: string; choices?: ChoicesItem[] }) => {
  const { filterValues } = useListContext();
  const isAlreadyIn = source in filterValues;
  let foundedFilter: (ChoicesItem | null)[] = [];

  if (source in filterValues && choices) {
    foundedFilter = choices
      ?.map((el) => {
        console.log(el);
        if (filterValues[source] instanceof Array && filterValues[source].includes(el.value)) {
          return el;
        }
        return el.value === filterValues[source] ? el : null;
      })
      .filter(Boolean);
  }

  return {
    isAlreadyIn,
    foundedFilter,
  };
};

export const RoundedFilterShow: React.FC<RoundedFilterShowProps> = ({
  handleClick,
  source,
  deleteFilter,
  defaultActive,
  label,
  choices,
}) => {
  const classes = useStyles();
  const { isAlreadyIn, foundedFilter } = useRoundedFilter({ source, choices });

  return (
    <span className={cn(classes.RoundedFilter, isAlreadyIn && classes.RoundedFilterActive)}>
      {defaultActive && (
        <span className="pinIcon">
          <PinIcon />
        </span>
      )}
      <button onClick={handleClick}>
        <span className="label">
          {foundedFilter && foundedFilter.length ? (
            <>
              {foundedFilter[0]?.name}{" "}
              {foundedFilter.length > 1 && <>&nbsp;+{foundedFilter.length - 1}</>}
            </>
          ) : (
            label
          )}
        </span>
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
