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
            inputType="create"
            fullWidth
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
          choices={getYearsChoices()}
          label="Production year greater than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.productionYearGteq`}
        />
        <AutocompleteInput
          resource={resource}
          choices={getYearsChoices()}
          label="Production year lesser than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.productionYearLteq`}
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.releaseDateGteg`}
          label="Release date greater than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <DateTimeInput
          source={`${parentSourceWithIndex}.releaseDateLteq`}
          label="Release date lesser than or equal to"
          resource={resource}
          inputType="create"
          helperText="hint"
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="IMDB Rating greater than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.imdbRatingGteq`}
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="IMDB Rating lesser than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.imdbRatingLteq`}
        />
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="Kinopoisk Rating greater than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.kinopoiskRatingGteq`}
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
        <AutocompleteInput
          resource={resource}
          choices={getRatings()}
          label="User Rating lesser than or equal to"
          inputType="create"
          source={`${parentSourceWithIndex}.userRatingLteq`}
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
