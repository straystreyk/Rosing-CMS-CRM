import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import { Skeleton } from "@material-ui/lab";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { log } from "util";

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

const SKELETON_WIDTH = 15;
const SKELETON_HEIGHT = 17;

export const PerPageCounter: React.FC<{ showBy?: (number | string)[] }> = ({
  showBy = [15, 25, 50, 100],
}) => {
  // const location = useLocation();
  // const history = useHistory();
  const { total, perPage, setPerPage } = useListContext();
  // const queryParams = new URLSearchParams(location.search);
  const classes = useStyles();

  const changePerPage = React.useCallback(
    (item) => {
      if (typeof item === "number") {
        setPerPage(item);
        return;
      }
      // queryParams.delete("perPage");
      // history.replace({
      //   search: queryParams.toString(),
      // });
    },
    [setPerPage]
  );

  return (
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
      {showBy?.map((el) => (
        <button
          className={cn("sortButton", perPage === el && "active")}
          key={el}
          onClick={() => changePerPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
