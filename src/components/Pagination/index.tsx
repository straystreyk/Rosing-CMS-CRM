import * as React from "react";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import { Arrow } from "../../constants/icons";
import { GoToCurrentPage } from "./go-to-current-page";
import { PaginationStyles } from "./styles";

const useStyles = makeStyles(PaginationStyles);

const MAX_PAGES = 6;

const usePagination = () => {
  const { setPage, total, perPage, page } = useListContext();
  const [arrOfPages, setArrOfPages] = React.useState<(string | number)[]>([]);

  const nbPages = Math.ceil(total / perPage) || 1;
  const currentPagesArray = Array(nbPages)
    .fill(true)
    .map((el, index) => index + 1);

  const changePage = (numberOfPage: number) => {
    setPage(numberOfPage);
  };

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
    changePage,
    nbPages,
    arrOfPages,
    currentPagesArray,
  };
};

export const Pagination = () => {
  const classes = useStyles();
  const { page } = useListContext();
  const { changePage, arrOfPages, nbPages, currentPagesArray } = usePagination();

  return (
    <>
      {nbPages > 1 && (
        <>
          <div className={classes.PaginationWrapper}>
            <button
              disabled={page <= 1}
              className={cn(classes.Button, "buttonPrev", page <= 1 && "disabled")}
              onClick={() => changePage(page - 1)}
            >
              <Arrow className="icon" />
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
              <Arrow className="icon" />
            </button>
          </div>
          {currentPagesArray.length > MAX_PAGES && <GoToCurrentPage />}
        </>
      )}
    </>
  );
};
