import * as React from "react";
import { useLoading } from "react-admin";
import { PerPageCounter } from "../Pagination/per-page-counter";
import { makeStyles } from "@material-ui/core";

import { MainLoader } from "../MainLoader";
import { Filters } from "../CustomFilters";
import { CustomDatagridProps, ToolbarProps } from "./custom-datagrid-types";
import { useTranslate } from "ra-core";
import { CreateButton } from "../UI/RA/create-button";
import { PlusIcon } from "../../constants/icons";
import { ShowDescriptionButton } from "../FormSection";
import { scrollBarStyles } from "../Themes/main-styles";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import cn from "classnames";

const useStyles = makeStyles({
  DataGridWrapper: {
    position: "relative",
    width: "calc(100vw - 55px)",
    overflowX: "scroll",
    transition: "0.3s width ease",
    ...scrollBarStyles,
    "& tbody": {
      userSelect: "unset",
    },
    "& table": {
      minWidth: 1100,
    },
    "@media (max-width: 599px)": {
      width: "100vw",
    },
    "@media (min-width: 600px)": {
      "&.active": {
        width: "calc(100vw - 240px)",
      },
    },
  },
  LoaderWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  TopToolBarWrapper: {
    marginTop: 16,
    padding: "0px 20px 0 24px",
    "& .description": {
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--secondary-color-main)",
      marginTop: 8,
    },
  },
  TopToolBarName: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& .title": {
      marginRight: 16,
      display: "inline-block",
      fontSize: 18,
      color: "var(--secondary-color-main)",
      fontWeight: 600,
    },
  },
  TopToolBar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginLeft: 10,
    },
  },
});

const LOADER_SIZE = 50;

const ToolBar: React.FC<{
  basePath?: string;
  resource: string;
  toolbar?: React.FC<ToolbarProps>;
}> = ({ resource, basePath, toolbar: Toolbar }) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <>
      {Toolbar ? (
        <Toolbar basePath={basePath ?? ""} resource={resource} />
      ) : (
        <div className={classes.TopToolBar}>
          <CreateButton
            icon={<PlusIcon color="#fff" />}
            label={"Create " + translate(`resources.${resource}.name`).toLowerCase()}
            basePath={basePath}
            to={basePath + "/create"}
          />
        </div>
      )}
    </>
  );
};

export const DatagridWrapper: React.FC<CustomDatagridProps> = ({
  children,
  filters,
  offDescription,
  datagridWrapperClassName,
  ...props
}) => {
  const classes = useStyles();
  const translate = useTranslate();
  const loading = useLoading();
  const [showDescription, setShowDescription] = React.useState<boolean>(true);
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

  return (
    <>
      {!offDescription ? (
        <div className={classes.TopToolBarWrapper}>
          <div className={classes.TopToolBarName}>
            <div>
              <span className="title">{translate(`resources.${props.resource}.name`)}</span>
              {props.listText && (
                <ShowDescriptionButton
                  showDescription={showDescription}
                  setShowDescription={setShowDescription}
                />
              )}
            </div>
            <ToolBar toolbar={props.toolbar} basePath={props.basePath} resource={props.resource} />
          </div>
          {showDescription && <div className="description">{props.listText}</div>}
        </div>
      ) : (
        <div className={classes.TopToolBarWrapper}>
          <ToolBar toolbar={props.toolbar} basePath={props.basePath} resource={props.resource} />
        </div>
      )}
      <Filters filters={filters} />
      <PerPageCounter />
      <div className={cn(classes.DataGridWrapper, datagridWrapperClassName, open && "active")}>
        {children}
      </div>
      {loading && (
        <div className={classes.LoaderWrapper}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </div>
      )}
    </>
  );
};
