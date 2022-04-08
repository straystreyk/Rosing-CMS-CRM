import * as React from "react";
import { MainLoader } from "../MainLoader";
import { SortList } from "../Pagination/sort-list";
import { makeStyles, TableContainer } from "@material-ui/core";
import { useListContext } from "react-admin";

const useStyles = makeStyles({
  DataGridWrapper: {
    position: "relative",
  },
  LoaderWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 200,
    top: 0,
    left: 0,
  },
});

export const DatagridWrapper: React.FC<{ loading?: boolean }> = ({ children }) => {
  const classes = useStyles();
  const { loading } = useListContext();

  return (
    <>
      <SortList />
      <div className={classes.DataGridWrapper}>{children}</div>
      {loading && (
        <div className={classes.LoaderWrapper}>
          <MainLoader flex size={50} centered />
        </div>
      )}
    </>
  );
};
