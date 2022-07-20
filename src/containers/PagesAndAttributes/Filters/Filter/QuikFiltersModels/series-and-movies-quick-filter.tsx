import React from "react";
import { ComponentArrayInputType, InputProps } from "../../../../../components/Inputs/input-types";
import {
  AutocompleteArrayInput,
  DateTimeInput,
  getRatings,
  getYearsChoices,
  SelectInput,
} from "../../../../../components/Inputs";
import {
  AGGREGATION_CHOICES,
  INVERSE_SELECT,
  SELECT_DISTRIBUTION,
} from "../../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { ArrayInputWithDifferentFields } from "../../../../../components/Inputs/ArrayInputs/ArrayInputWithDifferentFields";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { GroupInputsV2 } from "../../../../../components/GroupInputs/group-inputs-v2";

const INPUT_ITEMS_PER_PAGE = 25;

const NotArrayField: React.FC<InputProps> = React.memo(({ resource, source, inputType }) => {
  return (
    <>
      <SelectInput
        label={source === "moviesFilters" ? "Movies aggregation" : "Series aggregation"}
        defaultValue="intersection"
        resource={resource}
        inputType={inputType}
        source={`${source}Aggregation`}
        choices={AGGREGATION_CHOICES}
        fullWidth
      />
    </>
  );
});

export const SeriesAndMoviesQuickFilterInputs: React.FC<ComponentArrayInputType> = React.memo(
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
            inputType={inputType}
            helperText="You can select several genres from the list"
            offFastEdit
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
            inputType={inputType}
            source={`${parentSourceWithIndex}.rightHolderIdIn`}
            helperText="The company - the copyright holder of the film"
            fullWidth
            offFastEdit
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
            inputType={inputType}
            offFastEdit
            helperText="The partner directory from which the movie is imported. The logo of the external catalog will be displayed when previewing the movie in the app."
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
            inputType={inputType}
            resource={resource}
            helperText="hint"
            offFastEdit
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Cast members"
          source={`${parentSourceWithIndex}.castMemberIdIn`}
          reference="media_content/attributes/people"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          allowEmpty
        >
          <AutocompleteArrayInput
            resource={resource}
            source={`${parentSourceWithIndex}.castMemberIdIn`}
            optionText="fullName"
            inputType={inputType}
            fullWidth
            offFastEdit
          />
        </ReferenceArrayInput>
        <AutocompleteArrayInput
          source={`${parentSourceWithIndex}.distributionIn`}
          label="CMS distribution"
          inputType={inputType}
          resource={resource}
          choices={SELECT_DISTRIBUTION}
          helperText="Distribution"
          offFastEdit
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.createdAtGteq`}
          label="Created at greater than or equal to"
          resource={resource}
          inputType={inputType}
          helperText="hint"
          offFastEdit
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.createdAtLteq`}
          label="Created at lesser than or equal to"
          resource={resource}
          inputType={inputType}
          helperText="hint"
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getYearsChoices()}
          label="Production year greater than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.productionYearGteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getYearsChoices()}
          label="Production year lesser than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.productionYearLteq`}
          offFastEdit
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.releaseDateGteq`}
          label="Release date greater than or equal to"
          resource={resource}
          inputType={inputType}
          helperText="hint"
          offFastEdit
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.releaseDateLteq`}
          label="Release date lesser than or equal to"
          resource={resource}
          inputType={inputType}
          helperText="hint"
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="IMDB Rating greater than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.imdbRatingGteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="IMDB Rating lesser than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.imdbRatingLteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="Kinopoisk Rating greater than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.kinopoiskRatingGteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="Kinopoisk Rating lesser than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.kinopoiskRatingLteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="User Rating greater than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.userRatingGteq`}
          offFastEdit
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="User Rating lesser than or equal to"
          inputType={inputType}
          source={`${parentSourceWithIndex}.userRatingLteq`}
          offFastEdit
        />
        <SelectInput
          label="Invert results"
          resource={resource}
          inputType={inputType}
          source={`${parentSourceWithIndex}.invertResults`}
          choices={INVERSE_SELECT}
          defaultValue={false}
          offFastEdit
        />
      </>
    );
  }
);

export const SeriesAndMoviesQuickFilterModel: React.FC<ComponentArrayInputType> = React.memo(
  ({ resource, source, inputType }) => {
    return (
      <ArrayInputWithDifferentFields
        componentWrapper={GroupInputsV2}
        componentWrapperTitle="Filters"
        notArrayField={NotArrayField}
        component={SeriesAndMoviesQuickFilterInputs}
        buttonText="Add filters"
        headerTitle={source === "moviesFilters" ? "Movies" : "Series"}
        resource={resource}
        source={source}
        inputType={inputType}
      />
    );
  }
);
