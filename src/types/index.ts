import { ReactChildren } from "react";
import {
  useListController,
  ReduxState,
  Record,
  Identifier,
  usePermissions,
  RedirectionSideEffect,
} from "ra-core";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import * as H from "history";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FormRenderProps } from "react-final-form";

export interface FormProps {
  resource: string;
  type: "create" | "edit" | "show";
  id?: string;
}

export interface ShowProps {
  resource: string;
  basePath?: string;
}

export type ThemeName = string;

export interface AppState extends ReduxState {
  theme: ThemeName;
}

export interface Category extends Record {
  name: string;
}

export interface User extends Record {
  first_name: string;
  last_name: string;
  username: string;
  phone: String;
  contact_email: string;
}

export interface Movie extends Record {
  slug: string;
  name: string;
  stream_source_id: string;
  original_name: string;
  description: String;
  production_year: number;
  duration: number;
  markers: string[];
  right_holder_id: Identifier;
  release_date: Date;
}

export interface Account extends Record {
  first_name: string;
  last_name: string;
  last_seen: string;
  roles: string[];
}

export type OrderStatus = "ordered" | "delivered" | "cancelled";

/**
 * Types to eventually add in react-admin
 */

export interface FieldProps<T extends Record = Record> {
  addLabel?: boolean;
  label?: string;
  record?: T;
  source?: string;
  resource?: string;
  basePath?: string;
  formClassName?: string;
}

export interface ReferenceFieldProps<T extends Record = Record> extends FieldProps<T> {
  reference: string;
  children: ReactChildren;
  link?: string | false;
  sortBy?: string;
}

export type ReviewStatus = "accepted" | "pending" | "rejected";

export interface ResourceMatch {
  id: string;

  [k: string]: string;
}

type FilterClassKey = "button" | "form";

export interface ToolbarProps<T extends Record = Record> {
  handleSubmitWithRedirect?: (redirect: RedirectionSideEffect) => void;
  handleSubmit?: FormRenderProps["handleSubmit"];
  invalid?: boolean;
  pristine?: boolean;
  saving?: boolean;
  submitOnEnter?: boolean;
  redirect?: RedirectionSideEffect;
  basePath?: string;
  record?: T;
  resource?: string;
  undoable?: boolean;
}

export interface BulkActionProps<Params = {}> {
  basePath?: string;
  filterValues?: Params;
  resource?: string;
  selectedIds?: Identifier[];
}

export interface FilterProps<Params = {}> {
  classes?: ClassNameMap<FilterClassKey>;
  context?: "form" | "button";
  displayedFilters?: { [K in keyof Params]?: boolean };
  filterValues?: Params;
  hideFilter?: ReturnType<typeof useListController>["hideFilter"];
  setFilters?: ReturnType<typeof useListController>["setFilters"];
  showFilter?: ReturnType<typeof useListController>["showFilter"];
  resource?: string;
}

export interface ResourceComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
> extends RouteComponentProps<Params, C, S> {
  resource: string;
  options: object;
  hasList: boolean;
  hasEdit: boolean;
  hasShow: boolean;
  hasCreate: boolean;
  permissions: ReturnType<typeof usePermissions>["permissions"];
}

declare global {
  interface Window {
    restServer: any;
  }
}

/**
 * Filters types
 */

export interface filterTypes {
  title: string;
  source: string;
  component: any;
}

/**
 * Types for server rest api
 */

export interface SelectItemsTypes {
  name: string;
  value: string;
}

export interface ServerImage {
  updatedAt?: string;
  createdAt?: string;
  height: number;
  width: number;
  id: string;
  file: string;
  kind: string;
}

export interface MoviesFormState {
  images: ServerImage[];
  imageIds: string[];
}

export interface imageUploaderProps {
  getImageId: (id: string) => void;
  deleteImageId: (id: string) => void;
  type: string;
  typeName: string;
  imageId?: string;
  serverUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}
