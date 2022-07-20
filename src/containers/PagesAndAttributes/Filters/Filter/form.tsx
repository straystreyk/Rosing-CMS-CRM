import * as React from "react";

import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../types";
import { NumberInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { FormSection } from "../../../../components/FormSection";
import { SelectModelsInput } from "../../../../components/Inputs/select-models-input";
import { SeriesAndMoviesQuickFilterModel } from "./QuikFiltersModels/series-and-movies-quick-filter";
import { AudioShowQuickFilterModel } from "./QuikFiltersModels/audio-shows-quick-filter";
import { InputFormType, InputProps } from "../../../../components/Inputs/input-types";
import { ChannelsQuickFilterModel } from "./QuikFiltersModels/channels-quick-filter";
import { HighlightsQuickFilter } from "./QuikFiltersModels/highlights-quick-filter";
import { NewsQuickFilter } from "./QuikFiltersModels/news-quick-filter";
import { MatchesQuickFilter } from "./QuikFiltersModels/matches-quick-filters";

const quickFiltersModels: (resource: string, inputType: InputFormType) => InputProps[] = (
  resource,
  inputType
) => [
  {
    inputType,
    source: "moviesFilters",
    label: "Movies filters",
    resource,
    component: SeriesAndMoviesQuickFilterModel,
  },
  {
    inputType,
    source: "seriesFilters",
    label: "Series filters",
    resource,
    component: SeriesAndMoviesQuickFilterModel,
  },
  {
    inputType,
    source: "audioShowsFilters",
    label: "Audio shows filters",
    resource,
    component: AudioShowQuickFilterModel,
  },
  {
    inputType,
    source: "channelsFilters",
    label: "Channels filters",
    resource,
    component: ChannelsQuickFilterModel,
  },
  {
    inputType,
    source: "highlightsFilters",
    label: "Highlights filters",
    resource,
    component: HighlightsQuickFilter,
  },
  {
    inputType,
    source: "newsFilters",
    label: "News filters",
    resource,
    component: NewsQuickFilter,
  },
  {
    inputType,
    source: "matchesFilters",
    label: "Matches filters",
    resource,
    component: MatchesQuickFilter,
  },
];

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <FormSection formType={type}>
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          helperText="hint"
          fullWidth
        />
        <NumberInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Position"
          source="position"
          helperText="hint"
          fullWidth
        />
        <SelectModelsInput
          inputType={type}
          resource={resource}
          buttonText="Add filter for media content"
          initialItems={quickFiltersModels(resource, type)}
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
