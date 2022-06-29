import * as React from "react";

import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../types";
import { NumberInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { FormSection } from "../../../../components/FormSection";
import { SelectModelsInput } from "../../../../components/Inputs/select-models-input";
import { SeriesAndMoviesQuickFilterModel } from "./QuikFiltersModels/series-and-movies-quick-filter";
import { AudioShowQuickFilterModel } from "./QuikFiltersModels/audio-shows-quick-filter";
import { InputProps } from "../../../../components/Inputs/input-types";
import { ChannelsQuickFilterModel } from "./QuikFiltersModels/channels-quick-filter";
import { useFormState } from "react-final-form";

const quickFiltersModels: (resource: string) => InputProps[] = (resource) => [
  {
    inputType: "create",
    source: "moviesFilters",
    label: "Movies filters",
    resource,
    component: SeriesAndMoviesQuickFilterModel,
  },
  {
    inputType: "create",
    source: "seriesFilters",
    label: "Series filters",
    resource,
    component: SeriesAndMoviesQuickFilterModel,
  },
  {
    inputType: "create",
    source: "audioShowsFilters",
    label: "Audio shows filters",
    resource,
    component: AudioShowQuickFilterModel,
  },
  {
    inputType: "create",
    source: "channelsFilters",
    label: "Channels filters",
    resource,
    component: ChannelsQuickFilterModel,
  },
];

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  console.log(useFormState().values);
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
          initialItems={quickFiltersModels(resource)}
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
