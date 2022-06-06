import { FilterTemplate } from "../../../../components/CustomFilters/custom-filters-types";
import { DateFilter } from "../../../../components/CustomFilters/DateFilter";

export const videoFilesFilters: FilterTemplate[] = [
  {
    component: DateFilter,
    label: "Created At",
    source: "createdAt",
  },
  {
    component: DateFilter,
    label: "Updated At",
    source: "updatedAt",
  },
];
