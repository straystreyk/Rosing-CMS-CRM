import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "./styles";
import cn from "classnames";

const useStyles = makeStyles(TableFieldsStyles);

export const UrlField: React.FC<{
  to: string;
  name: string | number | React.ReactNode;
  className?: string;
}> = ({ to, name, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Link {...rest} className={cn(classes.NameField, className && className)} to={to}>
      {name}
    </Link>
  );
};
