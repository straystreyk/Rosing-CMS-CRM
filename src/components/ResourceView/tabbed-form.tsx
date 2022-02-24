import * as React from "react";
import { FormWithRedirect, TabbedFormView } from "react-admin";
import { useLocation, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { Toolbar } from "./edit-form";

const useStyles = makeStyles({
  TabbedView: {
    "& [class*='RaTabbedForm-content']": {
      padding: "0 24px",
      marginTop: "1em",
    },
    "& .MuiTabs-root": {
      padding: "0 24px",
      "& a": {
        textTransform: "unset",
      },
    },
  },
});

export const TabbedForm: React.FC<{ redirect?: string }> = ({ redirect, ...props }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const classes = useStyles();
  const formRootPathname = match ? match.url : location.pathname;

  return (
    <FormWithRedirect
      {...props}
      formRootPathname={formRootPathname}
      redirect={redirect ?? "list"}
      render={(formProps: any) => (
        <TabbedFormView
          className={classes.TabbedView}
          {...props}
          {...formProps}
          toolbar={<Toolbar />}
        />
      )}
    />
  );
};
