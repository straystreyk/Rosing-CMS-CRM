import { FC } from "react";

export type TitleActionButtonsType = FC<Omit<TitleProps, "name">>;

export type TitleProps = {
  name: string;
  form?: string;
  id?: string;
  record?: any;
  breadCrumbsOn?: boolean;
  basePath?: string;
  actionButtons?: TitleActionButtonsType;
};
