import { FC } from "react";
import { DatagridProps } from "ra-ui-materialui";
import { FilterTemplate } from "../CustomFilters/custom-filters-types";

export interface ToolbarProps {
  basePath: string;
  resource: string;
}

export interface CustomDatagridProps extends DatagridProps {
  basePath?: string;
  resource: string;
  filters?: FilterTemplate[];
  draggable?: boolean;
  toolbar?: FC<ToolbarProps>;
  listText?: string;
  offDescription?: boolean;
}
