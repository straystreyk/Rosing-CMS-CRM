import * as React from "react";
import { useListContext } from "react-admin";
import { SortList } from "../Pagination/sort-list";
import { makeStyles } from "@material-ui/core";

import { MainLoader } from "../MainLoader";
import { Filters } from "../CustomFilters";
import { CustomDatagridProps } from "./custom-datagrid-types";

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

const LOADER_SIZE = 50;

export const DatagridWrapper: React.FC<CustomDatagridProps> = ({ children, filters }) => {
  const classes = useStyles();
  const { loading } = useListContext();

  return (
    <>
      {filters && <Filters filters={filters} />}
      <SortList />
      <div className={classes.DataGridWrapper}>{children}</div>
      {loading && (
        <div className={classes.LoaderWrapper}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </div>
      )}
    </>
  );
};
