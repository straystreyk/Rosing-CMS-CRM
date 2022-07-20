import { Styles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";

export const BreadCrumbsStyles: Styles<Theme, {}, string> = {
  breadcrumbs: {
    marginTop: "5px",
  },
  breadcrumb: {
    color: "var(--primary-button-default)",
    fontSize: 12,
  },
  crumbLink: {
    color: "var(--primary-button-default)",
    textDecoration: "none",
  },
  lastCrumb: {
    color: "var(--primary-text-default)",
    pointerEvents: "none",
  },
  Disabled: {
    pointerEvents: "none",
  },
};
