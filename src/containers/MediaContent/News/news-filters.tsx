import { FilterTemplate } from "../../../components/CustomFilters/custom-filters-types";
import { ChoicesFilter } from "../../../components/CustomFilters/ChoicesFilter";
import { PUBLISHED_CHOICES } from "../../../components/CustomFilters/constants";
import { DateFilter } from "../../../components/CustomFilters/DateFilter";

export const newsFilters: FilterTemplate[] = [
  {
    component: ChoicesFilter,
    choices: PUBLISHED_CHOICES,
    label: "Publish",
    source: "published",
  },
  {
    component: DateFilter,
    label: "Created At",
    source: "createdAt",
    defaultActive: true,
  },
  {
    component: DateFilter,
    label: "Updated At",
    source: "updatedAt",
    defaultActive: true,
  },
];
