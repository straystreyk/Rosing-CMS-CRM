import * as React from "react";
import cn from "classnames";

import { useListContext, useLoading } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
import { ExportResourceButton } from "../Export/ExportResourceButton";
import { RefreshButton } from "../UI/Buttons/RefreshButton";

const useStyles = makeStyles({
  Sort: {
    fontSize: 14,
    lineHeight: "20px",
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
        fontWeight: 500,
      },
    },
  },
  TableActions: {
    "& button": {
      marginLeft: 12,
      "&:first-child": {
        marginLeft: 0,
      },
    },
  },
  SortWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 20px 8px 24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

const SKELETON_WIDTH = 150;
const SKELETON_HEIGHT = 20;

export const PerPageCounter: React.FC<{ showBy?: (number | string)[]; resource: string }> = ({
  showBy = [15, 25, 50, 100],
  resource,
}) => {
  const location = useLocation();
  const { total, perPage, setPerPage, loading } = useListContext();
  const queryParams = new URLSearchParams(location.search);
  const classes = useStyles();

  const changePerPage = React.useCallback(
    (item) => {
      if (typeof item === "number") {
        setPerPage(item);
        return;
      }
    },
    [setPerPage]
  );

  return (
    <div className={classes.SortWrapper}>
      <div className={classes.Sort}>
        {total ? (
          <>
            Total&nbsp;{total}
            {total >= 15 && (
              <>
                ,show by:&nbsp;
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
              </>
            )}
          </>
        ) : (
          <Skeleton
            style={{ background: "var(--secondary-gradient)" }}
            variant="rect"
            animation={false}
            width={SKELETON_WIDTH}
            height={SKELETON_HEIGHT}
          />
        )}
      </div>
      <div className={classes.TableActions}>
        <ExportResourceButton resource={resource} />
        <RefreshButton />
      </div>
    </div>
  );
};
