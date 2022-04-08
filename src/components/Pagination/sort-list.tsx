import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  Sort: {
    fontSize: 14,
    lineHeight: "20px",
    margin: "8px 0",
    color: "var(--secondary-color-default)",
    padding: "0 24px",
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
});

export const SortList: React.FC<{ showBy?: number[] }> = ({ showBy = [15, 25, 50, 100] }) => {
  const { total, perPage, setPerPage } = useListContext();
  const classes = useStyles();
  return (
    <div className={classes.Sort}>
      Total {total ?? <Skeleton style={{ display: "inline-block" }} width={15} height={17} />}, show
      by:{" "}
      {showBy?.map((number) => (
        <button
          className={cn("sortButton", perPage === number && "active")}
          key={number}
          onClick={() => setPerPage(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
