import * as React from "react";
import { Tooltip } from "@material-ui/core";
import { InformationIcon } from "../../../../../constants/icons";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  RatingItem: {
    borderBottom: "1px solid #E7E9E9",
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
    "&:hover": {
      "& svg": {
        "& path": {
          fill: "var(--secondary-color-main)",
        },
        "& circle": {
          stroke: "var(--secondary-color-main)",
        },
      },
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
          <InformationIcon />
        </button>
      </Tooltip>
    </div>
  );
};
