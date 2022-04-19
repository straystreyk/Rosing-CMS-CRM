import * as React from "react";
import cn from "classnames";
import { useHistory, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useNotify } from "ra-core";

import { breadcrumbsLinks } from "./breadcrumbs-link";
import { sanitizeId } from "../../helpers/form";
import { authClient } from "../Providers";
import { BreadcrumbsStyles } from "./syles";

interface BreadcrumbsProps {
  className?: string;
  resource: string;
}

const useStyles = makeStyles(BreadcrumbsStyles);

const useBreadcrumbs = () => {
  const {
    location: { pathname },
  } = useHistory();
  const notify = useNotify();
  const params = useParams<{ [id: string]: string }>();
  const [matched, setMatched] = React.useState(
    breadcrumbsLinks.filter((el) => {
      let href = el.href;

      if (el.dynamicParam && href.includes(`:${el.dynamicParam}`)) {
        href = href.replace(`:${el.dynamicParam}`, params[el.dynamicParam]);
      }

      if (el.secondDynamicParam && href.includes(`:${el.secondDynamicParam}`)) {
        href = href.replace(`:${el.secondDynamicParam}`, params[el.secondDynamicParam]);
      }

      return pathname.includes(href);
    })
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
            const { name } = res.data.item;

            if (!unmounted) {
              setMatched((prevState) =>
                prevState.map((item) => {
                  if (item === el && el.dynamicParam && el.secondDynamicParam) {
                    console.log("aswd");
                    return {
                      ...item,
                      name,
                      href: el.href
                        .replace(`:${el.dynamicParam}`, params[el.dynamicParam])
                        .replace(`:${el.secondDynamicParam}`, params[el.secondDynamicParam]),
                    };
                  }

                  if (item === el && el.dynamicParam) {
                    return {
                      ...item,
                      name,
                      href: el.href.replace(`:${el.dynamicParam}`, params[el.dynamicParam]),
                    };
                  }

                  return item;
                })
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

  return { matched };
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = React.memo(({ resource }) => {
  const classes = useStyles();
  const { matched } = useBreadcrumbs();

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
});
