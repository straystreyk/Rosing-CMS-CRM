import { ListProps } from "ra-ui-materialui";
import { ListTabProps } from "../Tabs/list-page-tabs";
import { JSXElementConstructor, ReactElement } from "react";

export interface ResourcesListProps extends Omit<ListProps, "resource"> {
  resource: string;
  permanentFilter?: Record<string, string | number>;
  listTabs?: ListTabProps[];
  offTitle?: boolean;
  breadCrumbsOn?: boolean;
  form?: "create" | "edit" | "show" | "list";
  toolbar?: any;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}
