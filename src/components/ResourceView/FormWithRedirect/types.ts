import * as React from "react";
import { FormWithRedirectRenderProps as FormWithRedirectRenderPropsRA } from "ra-core/esm/form/FormWithRedirect";
import { ToolbarProps as ToolbarPropsRA } from "ra-ui-materialui/lib/form/Toolbar";
import { Record as RaRecord } from "ra-core/esm/types";
import { TitleActionButtonsType } from "../ResourceTitle/types";

export interface EditFormProps {
  resource: string;
  record?: Partial<RaRecord>;
  redirect?: string;
  offToolbar?: boolean;
  onSuccess?: (data: any) => void;
  onFailure?: (error: Error) => void;
  onSuccessWithRedirect?: (data: any) => void;
  redirectButtonLabel?: string;
  redirectButtonIcon?: React.ReactElement;
  CustomToolbar?: React.FC;
  offRedirectButton?: boolean;
  form: "create" | "edit" | "show" | "list";
  offTitle?: boolean;
  basePath?: string;
  actionButtons?: TitleActionButtonsType;
}

export interface FormWithRedirectProps extends FormWithRedirectRenderPropsRA {
  basePath?: string;
}

export interface ToolbarProps extends ToolbarPropsRA {
  onSuccessWithRedirect?: (data: any) => void;
  redirectButtonIcon?: React.ReactElement;
  redirectButtonLabel?: string;
  record?: Partial<RaRecord>;
  onSuccess?: (data: any) => void;
  onFailure?: (error: Error) => void;
  formType: "create" | "edit" | "show" | "list";
  offRedirectButton?: boolean;
}
