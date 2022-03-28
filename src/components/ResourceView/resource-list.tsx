import { FC, useState, createContext, useContext } from "react";
import { List, Pagination, TopToolbar } from "react-admin";
import { PaginationProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { useTranslate } from "ra-core";
import { Box } from "@material-ui/core";

import { FilterSidebar } from "../SidebarFilter";
import { ListProps } from "../../types";
import { ResourceTitle } from "./resource-title";
import { Filters } from "../Filters";
import { CreateButton } from "../UI/RA/create-button";
import { ListPageTabs } from "../Tabs/list-page-tabs";
import { EditForm } from "./edit-form";
import { PlusIcon } from "../../constants/icons";

const useStyles = makeStyles({
  TopToolBar: {
    paddingRight: 20,
    alignItems: "center",
    paddingTop: 8,
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
          icon={<PlusIcon color="#fff" />}
          basePath={props.basePath}
          label={"Create " + translate(`resources.${props.resource}.name`)}
        />
        {/*<ExportButton label={"Export"} />*/}
      </TopToolbar>
      {context.filtersArray ? <Filters /> : null}
    </div>
  );
};

export const FilterContext = createContext<any>({});

export const ResourceList: FC<ListProps> = ({
  sideFilters,
  permanentFilter,
  filtersArray,
  listTabs,
  offTitle,
  breadCrumbs,
  empty,
  ...props
}) => {
  const [filter, setFilter] = useState<object>(permanentFilter ?? {});
  const classes = useStyles();

  return (
    <FilterContext.Provider value={{ filter, filtersArray, setFilter }}>
      <Box className={classes.TopList}>
        <EditForm offToolbar offTitle resource={props.resource}>
          <ResourceTitle name={props.resource} form="list" />
        </EditForm>
        {listTabs && <ListPageTabs tabs={listTabs} />}
      </Box>
      <List
        {...props}
        empty={empty}
        perPage={15}
        filters={props.filters}
        filter={filter}
        sort={{ field: "streamingUid", order: "DESC" }}
        pagination={<PostPagination />}
        actions={<ToolBar />}
        aside={<FilterSidebar sideFilters={sideFilters} />}
        basePath={props.basePath}
      >
        {props.children}
      </List>
    </FilterContext.Provider>
  );
};
