import { ChoicesFilter } from "../../../../components/CustomFilters/ChoicesFilter";
import {
  DOWNLOADABLE_CHOICES,
  EXTRA_VIDEO_CHOICES,
  MARKERS_CHOICES,
  PUBLISHED_CHOICES,
} from "../../../../components/CustomFilters/constants";
import { MultipleFiltersList } from "../../../../components/CustomFilters/MultipleFiltersList";
import { ALL_GENRES_FILTER } from "../../../../components/Providers/custom-requests";
import { FilterTemplate } from "../../../../components/CustomFilters/custom-filters-types";
import { DateFilter } from "../../../../components/CustomFilters/DateFilter";

export const movieFilters: FilterTemplate[] = [
  {
    component: ChoicesFilter,
    choices: DOWNLOADABLE_CHOICES,
    label: "Downloadable",
    source: "downloadable",
    defaultActive: true,
  },
  {
    component: ChoicesFilter,
    choices: PUBLISHED_CHOICES,
    label: "Publish",
    source: "published",
  },
  {
    component: ChoicesFilter,
    choices: EXTRA_VIDEO_CHOICES,
    label: "Extra videos",
    source: "extraVideosExist",
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
