import { FilterTemplate } from "../../../../../components/CustomFilters/custom-filters-types";
import { ChoicesFilter } from "../../../../../components/CustomFilters/ChoicesFilter";
import {
  MARKERS_CHOICES,
  PUBLISHED_CHOICES,
} from "../../../../../components/CustomFilters/constants";
import { MultipleFiltersList } from "../../../../../components/CustomFilters/MultipleFiltersList";
import { ALL_GENRES_FILTER } from "../../../../../components/Providers/custom-requests";
import { DateFilter } from "../../../../../components/CustomFilters/DateFilter";

export const channelFilter: FilterTemplate[] = [
  {
    component: ChoicesFilter,
    choices: PUBLISHED_CHOICES,
    label: "Publish",
    source: "published",
  },
  {
    component: MultipleFiltersList,
    query: ALL_GENRES_FILTER,
    label: "Genres",
    source: "genreIds",
    defaultActive: true,
  },
  {
    component: MultipleFiltersList,
    choices: MARKERS_CHOICES,
    label: "Labels",
    source: "markers",
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
