import { FilterTemplate } from "../../../components/CustomFilters/custom-filters-types";
import { ChoicesFilter } from "../../../components/CustomFilters/ChoicesFilter";
import {
  IMAGES_EXIST_CHOICES,
  PUBLISHED_CHOICES,
} from "../../../components/CustomFilters/constants";
import { DateFilter } from "../../../components/CustomFilters/DateFilter";

export const newsFilters: FilterTemplate[] = [
  {
    component: ChoicesFilter,
    choices: PUBLISHED_CHOICES,
    label: "Publish",
    source: "published",
  },
  {
    component: ChoicesFilter,
    choices: IMAGES_EXIST_CHOICES,
    label: "Images",
    source: "imagesExist",
  },
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
