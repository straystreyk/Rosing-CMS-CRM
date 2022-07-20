import React from "react";
import { ComponentArrayInputType, InputProps } from "../../../../../components/Inputs/input-types";
import {
  AutocompleteArrayInput,
  DateTimeInput,
  SelectInput,
} from "../../../../../components/Inputs";
import {
  AGGREGATION_CHOICES,
  INVERSE_SELECT,
  SELECT_DISTRIBUTION,
} from "../../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { ArrayInputWithDifferentFields } from "../../../../../components/Inputs/ArrayInputs/ArrayInputWithDifferentFields";
import { GroupInputsV2 } from "../../../../../components/GroupInputs/group-inputs-v2";

const INPUT_ITEMS_PER_PAGE = 25;

const NotArrayField: React.FC<InputProps> = React.memo(({ resource, source, inputType }) => {
  return (
    <>
      <SelectInput
        label="Channel aggregation"
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

export const ChannelsQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, inputType, source, index, parentSourceWithIndex }) => {
    return (
      <>
        <ReferenceArrayInput
          label="Genres"
          source={`${parentSourceWithIndex}.genreIdsIn`}
          reference="media_content/attributes/genres"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            source={`${parentSourceWithIndex}.genreIdsIn`}
            resource={resource}
            inputType="create"
            helperText="You can select several genres from the list"
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Languages"
          source={`${parentSourceWithIndex}.languageIdIn`}
          reference="media_content/attributes/languages"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            source={`${parentSourceWithIndex}.languageIdIn`}
            inputType="create"
            resource={resource}
            helperText="hint"
          />
        </ReferenceArrayInput>
        <AutocompleteArrayInput
          source={`${parentSourceWithIndex}.distributionIn`}
          label="CMS distribution"
          inputType="create"
          resource={resource}
          choices={SELECT_DISTRIBUTION}
          helperText="Distribution"
        />
        <SelectInput
          label="Invert results"
          resource={resource}
          inputType="create"
          source={`${parentSourceWithIndex}.invertResults`}
          choices={INVERSE_SELECT}
          defaultValue={false}
        />
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
      </>
    );
  }
);

export const ChannelsQuickFilterModel: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={ChannelsQuickFilterInputs}
        buttonText="Add filters"
        headerTitle="Channels"
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
