import * as React from "react";
import cn from "classnames";

import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
import { ExportResourceButton } from "../Export/ExportResourceButton";
import { RefreshButton } from "../UI/Buttons/RefreshButton";

const useStyles = makeStyles({
  Sort: {
    fontSize: 14,
    lineHeight: "20px",
    margin: "8px 0",
    color: "var(--secondary-color-default)",
    userSelect: "none",
    "& .sortButton": {
      display: "inline-block",
      margin: 5,
      fontSize: 14,
      cursor: "pointer",
      color: "var(--secondary-color-default)",
      "&.active": {
        color: "var(--secondary-color-main)",
      },
    },
  },
  SortActions: {
    "& button": {
      marginLeft: 0,
    },
  },
  SortWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px 0 24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

const SKELETON_WIDTH = 15;
const SKELETON_HEIGHT = 17;

export const PerPageCounter: React.FC<{ showBy?: (number | string)[]; resource: string }> = ({
  showBy = [15, 25, 50, 100],
  resource,
}) => {
  const location = useLocation();
  // const history = useHistory();
  const { total, perPage, setPerPage } = useListContext();
  const queryParams = new URLSearchParams(location.search);
  const classes = useStyles();

  const changePerPage = React.useCallback(
    (item) => {
      if (typeof item === "number") {
        setPerPage(item);
        return;
      }
      // queryParams.delete("perPage");
      // history.push(`${location.pathname}?${queryParams}`);
    },
    [setPerPage]
  );

  return (
    <div className={classes.SortWrapper}>
      <div className={classes.Sort}>
        Total&nbsp;
        {total ?? (
          <Skeleton
            style={{ display: "inline-block" }}
            width={SKELETON_WIDTH}
            height={SKELETON_HEIGHT}
          />
        )}
        , show by:&nbsp;
        {showBy?.map((number, index) => (
          <button
            className={cn(
              "sortButton",
              queryParams.has("perPage") && perPage === number && "active",
              !queryParams.has("perPage") && typeof number === "string" && "active"
            )}
            key={number}
            onClick={() => changePerPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className={classes.SortActions}>
        <ExportResourceButton resource={resource} />
        <RefreshButton />
      </div>
    </div>
  );
};
