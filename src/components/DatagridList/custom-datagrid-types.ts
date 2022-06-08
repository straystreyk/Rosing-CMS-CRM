import { DatagridProps, DatagridBodyProps as DatagridBodyPropsRA } from "ra-ui-materialui";
import { FilterTemplate } from "../CustomFilters/custom-filters-types";
import { FC, MouseEvent, ReactElement, TouchEvent } from "react";
import { Identifier, Record, Record as RecordRa } from "ra-core";
import { RecordMap } from "react-admin";

export interface ToolbarProps {
  basePath: string;
  resource: string;
}

type ExpandElementType =
  | ReactElement
  | FC<{
      basePath: string;
      id: Identifier;
      record: Record;
      resource: string;
    }>;

export interface CustomDatagridProps extends DatagridProps {
  basePath?: string;
  resource: string;
  filters?: FilterTemplate[];
  draggable?: boolean;
  toolbar?: FC<ToolbarProps>;
  listText?: string;
  offDescription?: boolean;
  datagridWrapperClassName?: string;
  offActions?: boolean;
  isDependentModel?: boolean;
  offRowToggle?: boolean;
}

export interface DatagridBodyProps extends Omit<DatagridBodyPropsRA, "resource"> {
  resource: string;
  data?: RecordMap<RecordRa>;
  expandElement?: ExpandElementType;
  offActions?: boolean;
  onToggleItem?: (id: Identifier | undefined, event: TouchEvent | MouseEvent) => void;
  offRowToggle?: boolean;
}

export interface DatagridRowProps {
  record?: RecordRa;
  resource: string;
  id?: Identifier;
  onToggleItem?: (id: Identifier | undefined, event: TouchEvent | MouseEvent) => void;
  selected?: boolean;
  basePath?: string;
  offActions?: boolean;
  expandElement?: ExpandElementType;
  ids?: Identifier[];
  offRowToggle?: boolean;
}
