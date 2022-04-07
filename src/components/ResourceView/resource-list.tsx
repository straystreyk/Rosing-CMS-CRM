import { FC, useState, createContext, useContext } from "react";
import { List, TopToolbar } from "react-admin";
import { makeStyles, Paper } from "@material-ui/core";
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
import { Pagination } from "../Pagination";

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

const ToolBar = (props: any) => {
  const styles = useStyles();
  const translate = useTranslate();
  const context = useContext(FilterContext);

  return (
    <div>
      <TopToolbar className={styles.TopToolBar}>
        {props.toolbar ? (
          <props.toolbar
            basePath={props.basePath}
            buttonLabel={"Create " + translate(`resources.${props.resource}.name`)}
          />
        ) : (
          <CreateButton
            icon={<PlusIcon color="#fff" />}
            label={"Create " + translate(`resources.${props.resource}.name`)}
            basePath={props.basePath}
            to={props.basePath + "/create"}
          />
        )}
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
  empty,
  breadCrumbsOn,
  form,
  toolbar,
  ...props
}) => {
  const [filter, setFilter] = useState<object>(permanentFilter ?? {});
  const classes = useStyles();

  return (
    <FilterContext.Provider value={{ filter, filtersArray, setFilter }}>
      <Box className={classes.TopList}>
        <EditForm offToolbar offTitle resource={props.resource}>
          <ResourceTitle
            breadCrumbsOn={breadCrumbsOn}
            filter={filter}
            name={props.resource}
            form={form ?? "list"}
          />
        </EditForm>
        {listTabs && <ListPageTabs tabs={listTabs} />}
      </Box>
      <List
        {...props}
        empty={empty}
        perPage={15}
        filters={props.filters}
        filter={filter}
        pagination={<Pagination />}
        actions={<ToolBar toolbar={toolbar} {...props} />}
        aside={<FilterSidebar sideFilters={sideFilters} />}
        basePath={props.basePath}
      >
        {props.children}
      </List>
    </FilterContext.Provider>
  );
};
