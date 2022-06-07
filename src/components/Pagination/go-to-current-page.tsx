import cn from "classnames";
import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { PaginationStyles } from "./styles";
import { useListContext } from "react-admin";

const useStyles = makeStyles(PaginationStyles);

const GoToPageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.35" stroke="#E7E9E9" strokeWidth="1.3" />
    <line
      x1="10.847"
      y1="7.38379"
      x2="13.4633"
      y2="10.0001"
      stroke="#E7E9E9"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <line
      x1="0.65"
      y1="-0.65"
      x2="4.35"
      y2="-0.65"
      transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 9.92773 12.6162)"
      stroke="#E7E9E9"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M6.45312 10H13.4531" stroke="#E7E9E9" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const useGoToCurrentPage = () => {
  const [value, setValue] = React.useState<string>("");
  const { setPage } = useListContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(() => e.target.value);

  const goToCurrentPage = React.useCallback(() => {
    if (value) {
      setPage(+value);
      setValue("");
    }
  }, [setPage, value]);
  React.useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && value) {
        goToCurrentPage();
      }
    });
  }, [goToCurrentPage, value]);
  return { handleChange, value, goToCurrentPage };
};

export const GoToCurrentPage = () => {
  const classes = useStyles();
  const { handleChange, value, goToCurrentPage } = useGoToCurrentPage();

  return (
    <div className={classes.SearchPage}>
      <span>Go to the page</span>
      <input placeholder="10" type="text" onChange={handleChange} value={value} />
      <button className={cn(classes.Button, !value && "disabled")} onClick={goToCurrentPage}>
        <GoToPageIcon />
      </button>
    </div>
  );
};
