import React from "react";
import { ComponentArrayInputType, InputProps } from "../../../../../components/Inputs/input-types";
import {
  AutocompleteArrayInput,
  DateTimeInput,
  SelectInput,
} from "../../../../../components/Inputs";
import { AGGREGATION_CHOICES, INVERSE_SELECT } from "../../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { ArrayInputWithDifferentFields } from "../../../../../components/Inputs/ArrayInputs/ArrayInputWithDifferentFields";
import { GroupInputsV2 } from "../../../../../components/GroupInputs/group-inputs-v2";
import { Checkbox } from "../../../../../components/Inputs/Checkbox";

const INPUT_ITEMS_PER_PAGE = 25;

const NotArrayField: React.FC<InputProps> = React.memo(({ resource, source, inputType }) => {
  return (
    <>
      <SelectInput
        label="News aggregation"
        defaultValue="intersection"
        resource={resource}
        inputType="create"
        source={`${source}Aggregation`}
        choices={AGGREGATION_CHOICES}
        fullWidth
      />
    </>
  );
});

export const NewsQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, inputType, source, index, parentSourceWithIndex }) => {
    return (
      <>
        <DateTimeInput
          source={`${parentSourceWithIndex}.createdAtGteq`}
          label="Created at greater than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.createdAtLteq`}
          label="Created at lesser than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.publishedAtGteq`}
          label="Published at greater than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.publishedAtLteq`}
          label="Published at lesser than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <SelectInput
          label="Invert results"
          resource={resource}
          inputType="create"
          source={`${parentSourceWithIndex}.invertResults`}
          choices={INVERSE_SELECT}
          defaultValue={false}
        />
        <Checkbox
          source={`${parentSourceWithIndex}.publishedAtBeforeNow`}
          label=""
          checkboxLabel="Published at before now"
          initialValue={false}
          resource={resource}
          inputType="create"
        />
      </>
    );
  }
);

export const NewsQuickFilter: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={NewsQuickFilterInputs}
        buttonText="Add filters"
        headerTitle="News"
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
