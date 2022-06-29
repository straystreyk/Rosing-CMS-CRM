import React from "react";
import { ComponentArrayInputType, InputProps } from "../../../../../components/Inputs/input-types";
import {
  AutocompleteArrayInput,
  DateTimeInput,
  getRatings,
  SelectInput,
} from "../../../../../components/Inputs";
import { AGGREGATION_CHOICES, INVERSE_SELECT } from "../../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { ArrayInputWithDifferentFields } from "../../../../../components/Inputs/ArrayInputs/ArrayInputWithDifferentFields";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { GroupInputsV2 } from "../../../../../components/GroupInputs/group-inputs-v2";

const INPUT_ITEMS_PER_PAGE = 25;

const NotArrayField: React.FC<InputProps> = React.memo(({ resource, source, inputType }) => {
  return (
    <>
      <SelectInput
        label="Audio show aggregation"
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

const SeriesAndMoviesQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
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
          label="Right Holder"
          source={`${parentSourceWithIndex}.rightHolderIdIn`}
          reference="media_content/attributes/providers/right_holders"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            resource={resource}
            inputType="create"
            source={`${parentSourceWithIndex}.rightHolderIdIn`}
            helperText="The company - the copyright holder of the film"
            fullWidth
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="External catalog"
          source={`${parentSourceWithIndex}.externalCatalogIdIn`}
          reference="media_content/attributes/providers/content_providers"
          resource={resource}
        >
          <AutocompleteArrayInput
            optionText="name"
            source={`${parentSourceWithIndex}.externalCatalogIdIn`}
            resource={resource}
            inputType="create"
            helperText="The partner directory from which the movie is imported. The logo of the external catalog will be displayed when previewing the movie in the app."
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
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="Kinopoisk Rating lesser than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.kinopoiskRatingLteq`}
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="User Rating greater than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.userRatingGteq`}
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

export const AudioShowQuickFilterModel: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={SeriesAndMoviesQuickFilterInputs}
        buttonText="Add filters"
        headerTitle="Audio show"
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
