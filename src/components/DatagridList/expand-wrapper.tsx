import * as React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  ExpandWrapper: {
    padding: "0 20px 30px 28px",
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
