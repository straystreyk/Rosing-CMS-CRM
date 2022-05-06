import * as React from "react";
import { List } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";

import { ResourceTitle } from "./resource-title";
import { ListPageTabs } from "../Tabs/list-page-tabs";
import { EditForm } from "./FormWithRedirect";
import { Pagination } from "../Pagination";
import { ResourcesListProps } from "./resources-types";
import { ReactElement } from "react";

const useStyles = makeStyles({
  TopList: {
    backgroundColor: "var(--primary-bg-3)",
  },
});

export const ResourceList: React.FC<ResourcesListProps> = ({
  permanentFilter,
  listTabs,
  listSubTabs,
  offTitle,
  empty,
  breadCrumbsOn,
  form = "list",
  filters = null,
  children,
  ...props
}) => {
  const [filter, setFilter] = React.useState<Record<string, any>>(permanentFilter ?? {});
  const classes = useStyles();

  return (
    <>
      <Box className={classes.TopList}>
        <EditForm form={form} offToolbar offTitle resource={props.resource}>
          <ResourceTitle
            breadCrumbsOn={breadCrumbsOn}
            filter={filter}
            name={props.resource}
            form={form ?? "list"}
          />
        </EditForm>
        {listTabs && <ListPageTabs tabs={listTabs} />}
      </Box>
      {listSubTabs && <ListPageTabs isSubTabs tabs={listSubTabs} />}
      <List
        {...props}
        empty={empty}
        bulkActionButtons={false}
        filters={filters as ReactElement | ReactElement[]}
        perPage={15}
        filter={filter}
        pagination={<Pagination />}
        basePath={props.basePath}
        actions={false}
      >
        {children}
      </List>
    </>
  );
};
