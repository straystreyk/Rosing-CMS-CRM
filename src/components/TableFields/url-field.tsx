import * as React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "./styles";

const useStyles = makeStyles(TableFieldsStyles);

interface UrlFieldProps {
  to: string;
  name: string | number | React.ReactNode;
  className?: string;
  component?: any;
  target?: string;
  href?: string;
}

export const UrlField: React.FC<UrlFieldProps> = ({
  to,
  name,
  className,
  component: Component = Link,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Component {...rest} className={cn(classes.NameField, className && className)} to={to}>
      {name}
    </Component>
  );
};
