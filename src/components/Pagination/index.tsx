import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import { Arrow } from "../../constants/icons";

const useStyles = makeStyles({
  Button: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&.buttonPrev": {
      transform: "rotate(180deg)",
    },
    "& svg circle, & svg line": {
      transition: "0.2s all ease",
    },
    "&:hover": {
      "& svg circle, & svg line": {
        stroke: "var(--accent-color)",
      },
    },
    "&.disabled": {
      opacity: 0.2,
      "& svg circle, & svg line": {
        stroke: "var(--secondary-color-default)",
      },
    },
  },
  Page: {
    display: "flex",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 5px",
    color: "var(--secondary-color-default)",
    transition: "0.35s all ease",
    "&:hover": {
      color: "var(--secondary-color-main)",
    },
    "&.active": {
      color: "var(--accent-color)",
    },
  },
  SearchPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--secondary-color-default)",
    userSelect: "none",
    marginBottom: 24,
    "& span": {
      display: "inline-block",
      fontSize: 12,
      marginRight: 4,
    },
    "& input": {
      maxWidth: 80,
      padding: "4px 12px",
      color: "var(--secondary-color-default)",
      borderRadius: 4,
      border: "1px solid var(--secondary-color-default)",
      fontSize: 12,
      transition: "0.35s all ease",
      marginRight: 10,
      "&::placeholder": {
        color: "var(--secondary-color-default)",
      },
      "&:focus::placeholder": {
        color: "transparent",
      },
      "&:focus": {
        color: "var(--secondary-color-main)",
        border: "1px solid #28A138",
      },
    },
  },
  PaginationWrapper: {
    margin: "24px 0",
    padding: "0 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  },
});

const MAX_PAGES = 6;

const usePagination = () => {
  const { setPage, total, perPage, page } = useListContext();
  const [value, setValue] = React.useState<string>("");
  const [arrOfPages, setArrOfPages] = React.useState<(string | number)[]>([]);

  const nbPages = Math.ceil(total / perPage) || 1;
  const currentPagesArray = Array(nbPages)
    .fill(true)
    .map((el, index) => index + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(() => e.target.value);

  const goToCurrentPage = React.useCallback(() => {
    if (value) {
      setPage(+value);
      setValue("");
    }
  }, [setPage, value]);

  const changePage = (numberOfPage: number) => {
    setPage(numberOfPage);
  };

  React.useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && value) {
        goToCurrentPage();
      }
    });
  }, [goToCurrentPage, value]);

  React.useEffect(() => {
    let template: (string | number)[] = [...currentPagesArray];
    if (currentPagesArray.length > MAX_PAGES) {
      if (page >= 1 && page <= 3) {
        template = [1, 2, 3, 4, "...", currentPagesArray.length];
      } else if (page === 4) {
        const sliced = currentPagesArray.slice(0, 5);
        template = [...sliced, "...", currentPagesArray.length];
      } else if (page > 3 && page < currentPagesArray.length - 2) {
        const sliced1 = currentPagesArray.slice(page - 2, page);
        const sliced2 = currentPagesArray.slice(page, page + 1);
        template = [1, "...", ...sliced1, ...sliced2, "...", currentPagesArray.length];
      } else if (page > currentPagesArray.length - 3) {
        const sliced = currentPagesArray.slice(currentPagesArray.length - 4);
        template = [1, "...", ...sliced];
      }
      setArrOfPages(() => template);

      return;
    }

    setArrOfPages(() => currentPagesArray);
  }, [nbPages, page]);

  return {
    value,
    handleChange,
    goToCurrentPage,
    changePage,
    nbPages,
    arrOfPages,
    currentPagesArray,
  };
};

export const Pagination = () => {
  const classes = useStyles();
  const { page } = useListContext();
  const {
    value,
    handleChange,
    goToCurrentPage,
    changePage,
    arrOfPages,
    nbPages,
    currentPagesArray,
  } = usePagination();

  return (
    <>
      {/*<div>*/}
      {/*  Displayed {ids.length} from {total}*/}
      {/*  <div style={{ width: 200, backgroundColor: "red", height: 2, borderRadius: 5 }}>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        height: 2,*/}
      {/*        borderRadius: 5,*/}
      {/*        backgroundColor: "green",*/}
      {/*        width: (ids.length / total) * 200,*/}
      {/*      }}*/}
      {/*    ></div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {nbPages > 1 && (
        <>
          <div className={classes.PaginationWrapper}>
            <button
              disabled={page <= 1}
              className={cn(classes.Button, "buttonPrev", page <= 1 && "disabled")}
              onClick={() => changePage(page - 1)}
            >
              <Arrow color="var(--secondary-color-main)" />
            </button>
            {arrOfPages.map((el, index) => {
              return (
                <button
                  key={index.toString()}
                  disabled={el === "..."}
                  onClick={() => (typeof el === "number" ? changePage(el) : null)}
                  className={cn(classes.Page, "page", page === el && "active")}
                >
                  {el}
                </button>
              );
            })}
            <button
              className={cn(classes.Button, page === nbPages && "disabled")}
              onClick={() => changePage(page + 1)}
              disabled={page === nbPages}
            >
              <Arrow color="var(--secondary-color-main)" />
            </button>
          </div>
          {currentPagesArray.length > MAX_PAGES && (
            <div className={classes.SearchPage}>
              <span>Go to the page</span>
              <input placeholder="10" type="text" onChange={handleChange} value={value} />
              <button className={classes.Button} onClick={goToCurrentPage}>
                <Arrow color="var(--secondary-color-default)" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
