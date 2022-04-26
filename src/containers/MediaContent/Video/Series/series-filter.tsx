import { FilterTemplate } from "../../../../components/CustomFilters/custom-filters-types";
import { ChoicesFilter } from "../../../../components/CustomFilters/ChoicesFilter";
import {
  EXTRA_VIDEO_CHOICES,
  MARKERS_CHOICES,
  PUBLISHED_CHOICES,
} from "../../../../components/CustomFilters/constants";
import { MultipleFiltersList } from "../../../../components/CustomFilters/MultipleFiltersList";
import { ALL_GENRES_FILTER } from "../../../../components/Providers/custom-requests";

export const seriesFilters: FilterTemplate[] = [
  {
    component: ChoicesFilter,
    choices: PUBLISHED_CHOICES,
    label: "Publish",
    source: "published",
    defaultActive: true,
  },
  {
    component: ChoicesFilter,
    choices: EXTRA_VIDEO_CHOICES,
    label: "Extra videos",
    source: "extraVideo",
  },
  {
    component: MultipleFiltersList,
    query: ALL_GENRES_FILTER,
    label: "Genres",
    source: "genreIds",
  },
  {
    component: MultipleFiltersList,
    choices: MARKERS_CHOICES,
    label: "Labels",
    source: "markers",
  },
];
