import * as React from "react";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../types";
import {
  NumberInput,
  requiredValidate,
  SelectInput,
  TextInput,
} from "../../../../components/Inputs";
import { FormSection } from "../../../../components/FormSection";
import { SelectModelsInput } from "../../../../components/Inputs/select-models-input";
import { ComponentArrayInputType, InputProps } from "../../../../components/Inputs/input-types";
import { AGGREGATION_CHOICES } from "../../../../constants/forms-constants";
import { ArrayInputWithDifferentFields } from "../../../../components/Inputs/ArrayInputs/ArrayInputWithDifferentFields";
import { useFormState } from "react-final-form";

const MovieFiltersModel: React.FC<InputProps> = ({ source, resource, inputType }) => {
  console.log(useFormState().values);
  return (
    <>
      <SelectInput
        label="movie aggregation"
        defaultValue="intersection"
        resource={resource}
        inputType={inputType}
        source={`${source}Aggregation`}
        choices={AGGREGATION_CHOICES}
        fullWidth
      />
      <ArrayInputWithDifferentFields buttonText="Add filter" resource={resource} source={source} />
    </>
  );
};

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
          initialItems={[
            {
              inputType: "create",
              source: "moviesFilters",
              label: "movieFilter",
              resource,
              component: MovieFiltersModel,
            },
          ]}
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
