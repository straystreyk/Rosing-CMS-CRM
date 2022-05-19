import * as React from "react";
import { useLoading } from "react-admin";
import { PerPageCounter } from "../Pagination/per-page-counter";
import { Backdrop, makeStyles } from "@material-ui/core";

import { MainLoader } from "../MainLoader";
import { Filters } from "../CustomFilters";
import { CustomDatagridProps, ToolbarProps } from "./custom-datagrid-types";
import { useTranslate } from "ra-core";
import { PlusIcon } from "../../constants/icons";
import { ShowDescriptionButton } from "../FormSection";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import cn from "classnames";
import { Link } from "react-router-dom";
import { StandardButton } from "../UI/Buttons/standard-button";
import { Pagination } from "../Pagination";
import { DatagridStyles } from "./styles";

const useStyles = makeStyles(DatagridStyles);

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
          <StandardButton
            component={Link}
            startIcon={<PlusIcon color="#fff" />}
            to={basePath + "/create"}
            variant="contained"
            color="primary"
          >
            Create {translate(`resources.${resource}.name`).toLowerCase()}
          </StandardButton>
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
    <div className={classes.List}>
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
      <Pagination />
      {loading && (
        <Backdrop style={{ zIndex: 5000 }} open={loading}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </Backdrop>
      )}
    </div>
  );
};
