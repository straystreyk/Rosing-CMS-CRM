import { Breadcrumb } from "./breadcrumbs-links";

export const breadCrumbNameBuilder: (
  breadcrumb: Breadcrumb,
  data: Record<string, any>
) => string = (breadcrumb, data) => {
  if (!breadcrumb.name) {
    if (breadcrumb.alternativeParam && breadcrumb.breadcrumbName) {
      return `${data[breadcrumb.alternativeParam][breadcrumb.breadcrumbName]} (${
        data[breadcrumb.breadcrumbName]
      })`;
    }
    return breadcrumb.breadcrumbName ? data[breadcrumb.breadcrumbName] : data.name;
  }
  return breadcrumb.name;
};

export const breadCrumbsLinksMatcher: (
  breadcrumbsLinks: Breadcrumb[],
  pathname: string,
  params: { [p: string]: string }
) => Breadcrumb[] = (breadcrumbsLinks, pathname, params) => {
  return breadcrumbsLinks.filter((el: Breadcrumb) => {
    let href = el.href;

    if (el.dynamicParam && href.includes(`:${el.dynamicParam}`)) {
      href = href.replace(`:${el.dynamicParam}`, params[el.dynamicParam]);
    }

    if (el.secondDynamicParam && href.includes(`:${el.secondDynamicParam}`)) {
      href = href.replace(`:${el.secondDynamicParam}`, params[el.secondDynamicParam]);
    }

    if (el.thirdDynamicParam && href.includes(`:${el.thirdDynamicParam}`)) {
      href = href.replace(`:${el.thirdDynamicParam}`, params[el.thirdDynamicParam]);
    }

    return pathname.includes(href);
  });
};

export const breadCrumbLinkBuilder = (
  item: Breadcrumb,
  el: Breadcrumb,
  params: { [p: string]: string },
  data: any,
  name: string
) => {
  let breadcrumb = item;

  if (item === el && el.dynamicParam) {
    breadcrumb = {
      ...item,
      name,
      href: el.href.replace(`:${el.dynamicParam}`, params[el.dynamicParam]),
    };
    if (item === el && el.secondDynamicParam) {
      breadcrumb = {
        ...item,
        name,
        href: breadcrumb.href.replace(`:${el.secondDynamicParam}`, params[el.secondDynamicParam]),
      };
    }
    if (item === el && el.thirdDynamicParam) {
      breadcrumb = {
        ...item,
        name,
        href: breadcrumb.href.replace(`:${el.thirdDynamicParam}`, params[el.thirdDynamicParam]),
      };
    }
    if (item === el && el.alternativeParam && el.alternativeHref) {
      breadcrumb = {
        ...item,
        name,
        href: el.alternativeHref
          .replace(`:${el.dynamicParam}`, params[el.dynamicParam])
          .replace(`:${el.secondDynamicParam}`, data[el.alternativeParam].id),
      };
    }
  }
  return breadcrumb;
};
