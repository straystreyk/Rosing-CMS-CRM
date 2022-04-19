import * as React from "react";
import { List } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { useTranslate } from "ra-core";
import { Box } from "@material-ui/core";

import { ResourceTitle } from "./resource-title";
import { CreateButton } from "../UI/RA/create-button";
import { ListPageTabs } from "../Tabs/list-page-tabs";
import { EditForm } from "./FormWithRedirect";
import { PlusIcon } from "../../constants/icons";
import { Pagination } from "../Pagination";
import { ResourcesListProps } from "./resources-types";

const useStyles = makeStyles({
  TopToolBar: {
    paddingRight: 20,
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 8,
    "& button": {
      marginLeft: 10,
    },
  },
  TopList: {
    backgroundColor: "var(--primary-bg-3)",
  },
});

const ToolBar = (props: any) => {
  const styles = useStyles();
  const translate = useTranslate();

  return (
    <>
      <div className={styles.TopToolBar}>
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
      </div>
    </>
  );
};

export const ResourceList: React.FC<ResourcesListProps> = ({
  permanentFilter,
  listTabs,
  offTitle,
  empty,
  breadCrumbsOn,
  form = "list",
  toolbar,
  filters = [],
  children,
  ...props
}) => {
  const [filter, setFilter] = React.useState<object>(permanentFilter ?? {});
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
      <List
        {...props}
        empty={empty}
        perPage={15}
        filters={filters}
        filter={filter}
        pagination={<Pagination />}
        actions={<ToolBar toolbar={toolbar} {...props} />}
        basePath={props.basePath}
      >
        {children}
      </List>
    </>
  );
};
