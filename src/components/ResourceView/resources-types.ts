import { ListProps } from "ra-ui-materialui";
import { ListTabProps } from "../Tabs/list-page-tabs";
import { JSXElementConstructor, ReactElement } from "react";
import { SortPayload } from "react-admin";

export interface ResourcesListProps extends Omit<ListProps, "resource"> {
  resource: string;
  permanentFilter?: Record<string, string | number>;
  listTabs?: ListTabProps[];
  listSubTabs?: ListTabProps[];
  offTitle?: boolean;
  breadCrumbsOn?: boolean;
  form?: "create" | "edit" | "show" | "list";
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  sort?: SortPayload;
}
