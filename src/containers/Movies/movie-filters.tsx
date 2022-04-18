import * as React from "react";
import { ChoicesFilter } from "../../components/CustomFilters/ChoicesFilter";
import {
  DOWNLOADABLE_CHOICES,
  EXTRA_VIDEO_CHOICES,
  MARKERS_CHOICES,
  PUBLISHED_CHOICES,
} from "../../components/CustomFilters/constants";
import { MultipleFiltersList } from "../../components/CustomFilters/MultipleFiltersList";
import { ALL_GENRES_FILTER } from "../../components/Providers/custom-requests";
import { DateFilter } from "../../components/CustomFilters/DateFilter";
import { FilterTemplate } from "../../components/CustomFilters/custom-filters-types";

export const filtersTmp: FilterTemplate[] = [
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
    query: MARKERS_CHOICES,
    label: "Labels",
    source: "markers",
  },
];

export const customFilters = [
  <ChoicesFilter
    choices={DOWNLOADABLE_CHOICES}
    label="Downloadable"
    source="downloadable"
    defaultActive
  />,
  <ChoicesFilter choices={PUBLISHED_CHOICES} label="Publish" source="published" />,
  <ChoicesFilter choices={EXTRA_VIDEO_CHOICES} label="Extra videos" source="extraVideo" />,
  <DateFilter source="createdFrom" secondSource="createdTo" label="Created at" />,
  <MultipleFiltersList query={ALL_GENRES_FILTER} label="Genres" source="genreIds" />,
  <MultipleFiltersList choices={MARKERS_CHOICES} label="Labels" source="markers" />,
];
