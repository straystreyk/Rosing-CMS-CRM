import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

const useStyles = makeStyles({
  Button: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&.buttonPrev": {
      transform: "rotate(180deg)",
    },
    "&.disabled": {
      opacity: 0.2,
    },
  },
  Page: {
    minWidth: 20,
    height: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 5px",
    color: "var(--secondary-color-default)",
    "&.active": {
      color: "var(--secondary-color-main)",
    },
  },
  PaginationWrapper: {
    marginTop: 24,
    padding: "0 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  },
});

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="10"
      cy="10"
      r="7.35"
      transform="rotate(-90 10 10)"
      stroke="#0F1F26"
      strokeWidth="1.3"
    />
    <line
      x1="9.5335"
      y1="7.38379"
      x2="12.1498"
      y2="10.0001"
      stroke="#0F1F26"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <line
      x1="0.65"
      y1="-0.65"
      x2="4.35"
      y2="-0.65"
      transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 8.61426 12.6162)"
      stroke="#0F1F26"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export const Pagination = () => {
  const { page, perPage, total, setPage, setPerPage } = useListContext();
  const nbPages = Math.ceil(total / perPage) || 1;
  const classes = useStyles();
  const arrOfPages = Array(100)
    .fill(true)
    .map((el, index) => index + 1);

  return (
    <>
      {nbPages > 1 && (
        <div className={classes.PaginationWrapper}>
          <button
            disabled={page <= 1}
            className={cn(classes.Button, "buttonPrev", page <= 1 && "disabled")}
            onClick={() => setPage(page - 1)}
          >
            <Arrow />
          </button>
          {arrOfPages.length <= 6
            ? arrOfPages.map((el, index) => {
                return (
                  <button
                    key={(index + el).toString()}
                    onClick={() => setPage(el)}
                    className={cn(classes.Page, "page", page === el && "active")}
                  >
                    {el}
                  </button>
                );
              })
            : null}
          {page !== nbPages && (
            <button className={classes.Button} onClick={() => setPage(page + 1)}>
              <Arrow />
            </button>
          )}
        </div>
      )}
    </>
  );
};
