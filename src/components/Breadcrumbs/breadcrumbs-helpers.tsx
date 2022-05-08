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

    return pathname.includes(href);
  });
};
