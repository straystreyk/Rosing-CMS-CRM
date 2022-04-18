import * as React from "react";
import cn from "classnames";
import { useHistory, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { breadcrumbsLinks } from "../../constants/breadcrumbs-link";
import { useNotify } from "ra-core";
import { authClient } from "../Providers";

interface BreadcrumbsProps {
  className?: string;
  resource: string;
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
    color: "var(--primary-text-default)",
  },
}));

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ resource }) => {
  const {
    location: { pathname },
  } = useHistory();
  const classes = useStyles();
  const notify = useNotify();
  const params = useParams<{ [id: string]: string }>();
  const [matched, setMatched] = React.useState(
    breadcrumbsLinks.filter((el) => pathname.includes(el.href))
  );

  React.useEffect(() => {
    let unmounted = false;
    if (Object.keys(params).length) {
      matched.forEach(async (el) => {
        if (el.dynamicParam && el.query) {
          try {
            const res = await authClient.query({
              query: el.query,
              variables: { [el.dynamicParam]: params[el.dynamicParam] },
            });

            const { name } = res.data.item;
            if (!unmounted) {
              setMatched((prevState) =>
                prevState.map((item) => (item === el ? { ...item, name } : item))
              );
            }
          } catch (e) {
            if (e instanceof Error) {
              notify(e.message);
            }
          }
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, []);

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
