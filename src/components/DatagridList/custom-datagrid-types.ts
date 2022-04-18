import { DatagridProps } from "ra-ui-materialui";
import { FilterTemplate } from "../CustomFilters/custom-filters-types";

export interface CustomDatagridProps extends DatagridProps {
  filters?: FilterTemplate[];
}
