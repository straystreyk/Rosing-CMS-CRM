import * as React from "react";
// import { makeStyles } from "@material-ui/core";
import { ShowProps } from "../../../types";
import { DatagridList } from "../../../components/DatagridList";
// import { TableFieldsStyles } from "../../../components/TableFields/styles";
import { EmptyTablePage } from "../../../components/EmptyTablePage";

// const useStyles = makeStyles(TableFieldsStyles);

export const TableView: React.FC<ShowProps> = (props) => {
  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      {...props}
      optimized
      draggable
    ></DatagridList>
  );
};
