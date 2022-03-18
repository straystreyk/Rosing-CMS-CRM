import * as React from "react";
import cn from "classnames";
import { useHistory, Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { breadcrumbsLinks } from "../../constants/breadcrumbs-link";
import { useFormState } from "react-final-form";

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
    fontSize: 12,
  },
  crumbLink: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
  },
  lastCrumb: {
    color: "#023864",
  },
}));

export const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
  const {
    location: { pathname },
  } = useHistory();
  const classes = useStyles();
  const { values } = useFormState();
  const location = useLocation();
  const [breadCrumbs, setBreadCrumbs] = React.useState(breadcrumbsLinks);
  const isAlreadyIn = !!breadCrumbs.filter((el) => el.name === values.name).length;

  React.useEffect(() => {
    if (values && values.name && !isAlreadyIn) {
      setBreadCrumbs((p) => [...p, { name: values.name, href: location.pathname }]);
    }
  }, []);

  const matched = breadCrumbs.filter((el) => pathname.includes(el.href));

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
