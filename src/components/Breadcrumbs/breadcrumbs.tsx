import * as React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

import { breadcrumbsLinks } from "../../constants/breadcrumbs-link";

interface BreadcrumbsProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: "5px",
  },
  breadcrumb: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
  },
  crumbLink: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
  },
  lastCrumb: {
    color: "#023864",
  },
}));

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const {
    location: { pathname },
  } = useHistory();
  const classes = useStyles();

  const matched = breadcrumbsLinks.filter((el) => pathname.includes(el.href));

  return (
    <div className={classes.breadcrumbs}>
      {matched.map((el, index) => {
        return (
          <span className={classes.breadcrumb} key={el.href + el.name}>
            {index === 0 ? "" : <span> / </span>}
            <Link
              className={cn(classes.crumbLink, index === matched.length - 1 && classes.lastCrumb)}
              to={el.href}
            >
              {el.name}
            </Link>
          </span>
        );
      })}
    </div>
  );
};
