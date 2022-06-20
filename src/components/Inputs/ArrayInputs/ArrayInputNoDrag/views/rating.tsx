import * as React from "react";
import { Tooltip } from "@material-ui/core";
import { InformationIcon } from "../../../../../constants/icons";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  RatingItem: {
    borderBottom: "1px solid var(--secondary-color-disable)",
    color: "var(--primary-text-default)",
    paddingBottom: 12,
    paddingTop: 12,
    display: "flex",
    alignItems: "center",
    "&:first-child": {
      paddingTop: 0,
    },
  },
  InformationButton: {
    display: "flex",
    marginLeft: 4,
    transition: "0.35s color ease",
    color: "var(--secondary-color-default)",
    "&:hover": {
      color: "var(--secondary-menu-2)",
    },
    "& svg.icon": {
      width: 20,
    },
  },
  RatingTooltip: {
    fontFamily: "var(--font-family)",
    "& span": {
      color: "var(--secondary-color-default)",
    },
  },
});

export type AgeRating = {
  tag: string;
  system: string;
};

export const RatingShow: React.FC<AgeRating> = ({ tag, system }) => {
  const classes = useStyles();

  return (
    <div className={classes.RatingItem}>
      {tag}
      <Tooltip
        title={
          <div className={classes.RatingTooltip}>
            <span>Raiting system:</span> {system}
          </div>
        }
        placement="right"
        arrow
      >
        <button className={classes.InformationButton}>
          <InformationIcon className="icon" />
        </button>
      </Tooltip>
    </div>
  );
};
