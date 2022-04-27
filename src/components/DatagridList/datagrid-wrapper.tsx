import * as React from "react";
import { useListContext, useLoading } from "react-admin";
import { PerPageCounter } from "../Pagination/per-page-counter";
import { makeStyles } from "@material-ui/core";

import { MainLoader } from "../MainLoader";
import { Filters } from "../CustomFilters";
import { CustomDatagridProps, ToolbarProps } from "./custom-datagrid-types";
import { useTranslate } from "ra-core";
import { CreateButton } from "../UI/RA/create-button";
import { PlusIcon } from "../../constants/icons";
import { ShowDescriptionButton } from "../FormSection";

const useStyles = makeStyles({
  DataGridWrapper: {
    position: "relative",
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
      <div className={classes.TopToolBar}>
        {Toolbar ? (
          <Toolbar
            basePath={basePath ?? ""}
            buttonLabel={"Create " + translate(`resources.${resource}.name`)}
          />
        ) : (
          <CreateButton
            icon={<PlusIcon color="#fff" />}
            label={"Create " + translate(`resources.${resource}.name`)}
            basePath={basePath}
            to={basePath + "/create"}
          />
        )}
      </div>
    </>
  );
};

export const DatagridWrapper: React.FC<CustomDatagridProps> = ({ children, filters, ...props }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const loading = useLoading();
  const [showDescription, setShowDescription] = React.useState<boolean>(true);

  return (
    <>
      {!props.offDescription ? (
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
      <div className={classes.DataGridWrapper}>{children}</div>
      {loading && (
        <div className={classes.LoaderWrapper}>
          <MainLoader flex size={LOADER_SIZE} centered />
        </div>
      )}
    </>
  );
};
