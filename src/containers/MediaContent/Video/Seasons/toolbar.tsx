import React from "react";
import { useListContext, useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { ToolbarProps } from "../../../../components/DatagridList/custom-datagrid-types";
import { BackArrowTitle, ResourceAddIcon } from "../../../../constants/icons";
import { MainLoader } from "../../../../components/MainLoader";
import { Link, useHistory } from "react-router-dom";
import { StandardButton } from "../../../../components/UI/Buttons/StandardButton/standard-button";
import { TopToolBar } from "../../../../constants/style-constants";

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
      color: "var(--primary-button-default)",
      "& .icon": {
        width: 15,
      },
    },
  },
  ActionsButtons: {
    "& button": {
      marginLeft: 10,
      "&:first-child": {},
    },
  },
  TopToolBar,
});

export const Toolbar: React.FC<ToolbarProps> = ({ basePath, resource, ...rest }) => {
  const { total } = useListContext();
  const history = useHistory();
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <div className={classes.ToolBarWrapper}>
      <div className={classes.Title}>
        <button onClick={() => history.goBack()}>
          <BackArrowTitle className="icon" />
        </button>
        {translate(`resources.${resource}.name`)} (
        {total ?? (
          <>
            &nbsp;
            <MainLoader display="inline-block" centered component="span" size={LOADER_SIZE} />
            &nbsp;
          </>
        )}
        )
      </div>
      <div className={classes.TopToolBar}>
        <StandardButton
          startIcon={<ResourceAddIcon />}
          text={"Create " + translate(`resources.${resource}.name`).toLowerCase()}
          variant="text"
          buttonType="primary"
          to={basePath + "/create"}
          component={Link}
        />
      </div>
    </div>
  );
};
