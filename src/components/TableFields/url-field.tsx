import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "./styles";

const useStyles = makeStyles(TableFieldsStyles);

export const UrlField: React.FC<{ to: string; name: string }> = ({ to, name }) => {
  const classes = useStyles();

  return (
    <Link className={classes.NameField} to={to}>
      {name}
    </Link>
  );
};
