import React from "react";
import { useListContext, useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { ToolbarProps } from "../../../../components/DatagridList/custom-datagrid-types";
import { BackArrowTitle, ExportButtonIcon, ResourceAddIcon } from "../../../../constants/icons";
import { MainLoader } from "../../../../components/MainLoader";
import { CreateButton } from "../../../../components/UI/RA/create-button";
import { ExportButton } from "../../../../components/UI/RA/export-button";
import { useHistory } from "react-router-dom";

const LOADER_SIZE = 15;
const useStyles = makeStyles({
  ToolBarWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: "22px",
    "& > button": {
      display: "inline-block",
      marginRight: 7,
    },
  },
  ActionsButtons: {
    "& button": {
      marginLeft: 10,
      "&:first-child": {},
    },
  },
});

export const Toolbar: React.FC<ToolbarProps> = ({ basePath, resource }) => {
  const { total } = useListContext();
  const history = useHistory();
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <div className={classes.ToolBarWrapper}>
      <div className={classes.Title}>
        <button onClick={() => history.goBack()}>
          <BackArrowTitle color="var(--primary-text-default)" />
        </button>
        {translate(`resources.${resource}.name`)} (
        {total ?? (
          <>
            &nbsp;
            <MainLoader display="inline-block" component="span" size={LOADER_SIZE} />
            &nbsp;
          </>
        )}
        )
      </div>
      <div className={classes.ActionsButtons}>
        <CreateButton
          label={"Create " + translate(`resources.${resource}.name`).toLowerCase()}
          variant="text"
          customColor="var(--accent-color)"
          to={basePath + "/create"}
          icon={<ResourceAddIcon color="var(--accent-color)" />}
        />
        <ExportButton
          icon={<ExportButtonIcon color="var(--primary-button-default)" />}
          variant="text"
          color="secondary"
          label="Download"
        />
      </div>
    </div>
  );
};
