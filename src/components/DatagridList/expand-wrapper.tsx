import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  ExpandWrapper: {
    padding: "0 20px 2px 76px",
  },
});

export const ExpandWrapper: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.ExpandWrapper}>{children}</div>
    </>
  );
};
