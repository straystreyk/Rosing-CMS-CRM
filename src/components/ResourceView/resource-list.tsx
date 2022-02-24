import { FC, useState, createContext, useContext } from "react";
import { List, Pagination, TopToolbar } from "react-admin";
import { PaginationProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { useTranslate } from "ra-core";
import { Box } from "@material-ui/core";

import { FilterSidebar } from "../SidebarFilter";
import { ListProps } from "../../types";
import { ResourceTitle } from "./resource-title";
import { CreateIcon } from "../../constants/forms-constants";
import { Filters } from "../Filters";
import { CreateButton } from "../UI/RA/create-button";
import { ExportButton } from "../UI/RA/export-button";
import { ListPageTabs } from "../Tabs/list-page-tabs";

const useStyles = makeStyles({
  TopToolBar: {
    paddingRight: 20,
    alignItems: "center",
    "& button": {
      marginLeft: 10,
    },
  },
  TopList: {
    backgroundColor: "#F2F7FB",
  },
});

const PostPagination = (props: PaginationProps) => (
  <Pagination rowsPerPageOptions={[5, 15, 25, 50]} {...props} />
);

const ToolBar = (props: any) => {
  const styles = useStyles();
  const translate = useTranslate();
  const context = useContext(FilterContext);

  return (
    <div>
      <TopToolbar className={styles.TopToolBar}>
        <CreateButton
          startIcon={<CreateIcon color="#fff" />}
          basePath={props.basePath}
          label={"Create " + translate(`resources.${props.resource}.name`)}
        />
        <ExportButton label={"Export"} />
      </TopToolbar>
      {context.filtersArray ? <Filters /> : null}
    </div>
  );
};

export const FilterContext = createContext<any>({});

export const ResourceList: FC<ListProps> = ({ sideFilters, filtersArray, listTabs, ...props }) => {
  const [filter, setFilter] = useState<object>({});
  const classes = useStyles();

  return (
    <FilterContext.Provider value={{ filter, filtersArray, setFilter }}>
      <Box className={classes.TopList}>
        <ResourceTitle name={props.resource} form="list" />
        {listTabs ? <ListPageTabs tabs={listTabs} /> : null}
      </Box>
      <List
        {...props}
        perPage={15}
        filter={filter}
        sort={{ field: "streamingUid", order: "DESC" }}
        pagination={<PostPagination />}
        actions={<ToolBar />}
        aside={<FilterSidebar sideFilters={sideFilters} />}
      >
        {props.children}
      </List>
    </FilterContext.Provider>
  );
};
