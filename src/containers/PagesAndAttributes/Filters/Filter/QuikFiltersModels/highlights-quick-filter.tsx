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

const INPUT_ITEMS_PER_PAGE = 25;

const NotArrayField: React.FC<InputProps> = React.memo(({ resource, source, inputType }) => {
  return (
    <>
      <SelectInput
        label="Highlights aggregation"
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

export const HighlightsQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, inputType, source, index, parentSourceWithIndex }) => {
    return (
      <>
        <ReferenceArrayInput
          label="TV channel"
          source={`${parentSourceWithIndex}.channelIdsIn`}
          reference="media_content/tv/channels/channels"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            source={`${parentSourceWithIndex}.channelIdsIn`}
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={inputType}
            helperText={undefined}
            fullWidth
          />
        </ReferenceArrayInput>
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
          source={`${parentSourceWithIndex}.startAtGteq`}
          label="Start at greater than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.startAtLteq`}
          label="Start at lesser than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.endAtGteq`}
          label="End at greater than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.endAtLteq`}
          label="End at lesser than or equal to"
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
      </>
    );
  }
);

export const HighlightsQuickFilter: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={HighlightsQuickFilterInputs}
        buttonText="Add filters"
        headerTitle="Highlights"
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
