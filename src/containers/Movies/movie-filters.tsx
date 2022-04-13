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

export const customFilters = [
  <ChoicesFilter
    choices={DOWNLOADABLE_CHOICES}
    label="Downloadable"
    source="downloadable"
    defaultActive
  />,
  <ChoicesFilter choices={PUBLISHED_CHOICES} label="Publish" source="published" />,
  <ChoicesFilter choices={EXTRA_VIDEO_CHOICES} label="Extra videos" source="extraVideo" />,
  <MultipleFiltersList query={ALL_GENRES_FILTER} label="Genres" source="genreIds" />,
  <MultipleFiltersList choices={MARKERS_CHOICES} label="Labels" source="markers" />,
];