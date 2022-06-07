import * as React from "react";
import cn from "classnames";
import { useHistory, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useNotify } from "ra-core";

import { breadcrumbsLinks } from "./breadcrumbs-links";
import { sanitizeId } from "../../helpers/form";
import { authClient } from "../Providers/AuthProvider/client";
import { BreadCrumbsStyles } from "./syles";
import {
  breadCrumbLinkBuilder,
  breadCrumbNameBuilder,
  breadCrumbsLinksMatcher,
} from "./breadcrumbs-helpers";
import { MainLoader } from "../MainLoader";

interface BreadCrumbsProps {
  className?: string;
  resource: string;
}

const LOADER_SIZE = 10;

const useStyles = makeStyles(BreadCrumbsStyles);

const useBreadcrumbs = () => {
  const {
    location: { pathname },
  } = useHistory();
  const notify = useNotify();
  const params = useParams<{ [p: string]: string }>();
  const [matched, setMatched] = React.useState(
    breadCrumbsLinksMatcher(breadcrumbsLinks, pathname, params)
  );

  React.useEffect(() => {
    let unmounted = false;
    if (Object.keys(params).length) {
      matched.forEach(async (el) => {
        if (el.query && el.dynamicParam && params[el.dynamicParam]) {
          try {
            const res = await authClient.query({
              query: el.query,
              variables: { id: sanitizeId(params[el.dynamicParam]) },
            });
            const data = res.data.item;
            const name = breadCrumbNameBuilder(el, data);
            if (!unmounted) {
              setMatched((prevState) => {
                return prevState.map((item) => breadCrumbLinkBuilder(item, el, params, data, name));
              });
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

  return { matched };
};

export const Breadcrumbs: React.FC<BreadCrumbsProps> = React.memo(({ resource }) => {
  const classes = useStyles();
  const { matched } = useBreadcrumbs();

  return (
    <div className={classes.breadcrumbs}>
      {matched.map((el, index) => {
        return (
          <span className={classes.breadcrumb} key={el.href + el.name}>
            {index === 0 ? "" : <span> / </span>}
            <Link
              className={cn(
                classes.crumbLink,
                index === matched.length - 1 && classes.lastCrumb,
                el.offLink && classes.Disabled
              )}
              to={el.href}
            >
              {!!el.name ? (
                el.name
              ) : (
                <MainLoader component="span" centered display="inline-block" size={LOADER_SIZE} />
              )}
            </Link>
          </span>
        );
      })}
    </div>
  );
});
