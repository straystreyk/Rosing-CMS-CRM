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
        label="Matches aggregation"
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

export const MatchesQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, inputType, source, index, parentSourceWithIndex }) => {
    return (
      <>
        <ReferenceArrayInput
          label="TV channels"
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
      </>
    );
  }
);

export const MatchesQuickFilter: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={MatchesQuickFilterInputs}
        buttonText="Add filters"
        headerTitle="Matches"
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
