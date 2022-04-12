import { DatagridProps } from "ra-ui-materialui";
import { ReactElement } from "react";

export interface CustomDatagridProps extends DatagridProps {
  filters?: ReactElement[];
}
