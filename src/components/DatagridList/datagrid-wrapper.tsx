import * as React from "react";
import cn from "classnames";

import { useLoading } from "react-admin";
import { useTranslate } from "ra-core";
import { useSelector } from "react-redux";
import { Backdrop, Collapse, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MainLoader } from "../MainLoader";
import { Filters } from "../CustomFilters";
import { CustomDatagridProps, ToolbarProps } from "./custom-datagrid-types";
import { ArrayInputItemArrow, PlusIcon } from "../../constants/icons";
import { AppState } from "../../types";
import { PerPageCounter } from "../Pagination/per-page-counter";
import { StandardButton } from "../UI/Buttons/StandardButton/standard-button";
import { Pagination } from "../Pagination";
import { DatagridStyles } from "./styles";
import { outlineStyles } from "../Themes/main-styles";

const useStyles = makeStyles({
  ...DatagridStyles,
  Outline: {
    "&:focus-visible": outlineStyles,
    "& .icon": {
      width: 8,
      height: 8,
    },
  },
});

const LOADER_SIZE = 70;

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
          <StandardButton
            component={Link}
            startIcon={<PlusIcon />}
            to={`${basePath}/create`}
            variant="contained"
            buttonType="primary"
            text={`Create ${translate(`resources.${resource}.name`).toLowerCase()}`}
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
  const [isShown, setIsShown] = React.useState<boolean>(true);
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

  const show = () => setIsShown((p) => !p);

  return (
    <div className={classes.List}>
      {!offDescription ? (
        <div className={classes.TopToolBarWrapper}>
          <div className={classes.TopToolBarName}>
            <button className={classes.Outline} onClick={show}>
              <span className="title">{translate(`resources.${props.resource}.name`)}</span>
              <ArrayInputItemArrow className="icon" />
            </button>
            <ToolBar toolbar={props.toolbar} basePath={props.basePath} resource={props.resource} />
          </div>
          <Collapse unmountOnExit in={isShown}>
            <div className="description">{props.listText}</div>
          </Collapse>
        </div>
      ) : (
        <div className={classes.TopToolBarWrapper}>
          <ToolBar toolbar={props.toolbar} basePath={props.basePath} resource={props.resource} />
        </div>
      )}
      <Filters filters={filters} />
      <PerPageCounter resource={props.resource} />
      <div className={cn(classes.DataGridWrapper, datagridWrapperClassName, open && "active")}>
        {children}
      </div>
      <Pagination />
      {loading && (
        <Backdrop style={{ zIndex: 5000 }} open={loading}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </Backdrop>
      )}
    </div>
  );
};
