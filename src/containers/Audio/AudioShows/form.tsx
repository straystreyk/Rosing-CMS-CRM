import * as React from "react";

import { FormProps } from "../../../types";
import { FormTabs } from "../../../components/Tabs/form-tabs";
import {
  ArrayInput,
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  formatTimeInput,
  getYearsChoices,
  NumberInput,
  parseTimeInput,
  ReferenceInput,
  requiredValidate,
  RichTextInput,
  SelectInput,
  TextInput,
} from "../../../components/Inputs";
import {
  INPUT_LABEL_PROPS,
  PUBLISHED_CHOICES_FORM,
  SELECT_DISTRIBUTION,
  SELECT_MARKERS,
} from "../../../constants/forms-constants";
import { ReferenceCustomInput } from "../../../components/Inputs/ReferenceInputs/reference-custom-input";
import {
  ALL_COUNTRIES,
  ALL_GENRES,
  ALL_PRODUCTION_COUNTRIES,
  ALL_RIGHT_HOLDERS,
  ALL_ROLES,
} from "../../../components/Providers/custom-requests";
import { FormSection } from "../../../components/FormSection";
import { MetaData } from "../../../components/Models/Metadata";
import { CastMembers } from "../../../components/Models/CastMembers/cast-members";
import { ArrayInputStyles } from "../../../components/Models/CastMembers/styles";
import { makeStyles } from "@material-ui/core";
import { RadioButtonGroupInput } from "../../../components/Inputs/RadioButtonGroupInput";
import { RatingSystems } from "../../../components/Models/RatingSytems";
import { CheckBoxGroup } from "../../../components/UI/MaterialUI/check-box-group";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { StandardButton } from "../../../components/UI/Buttons/standard-button";
import { ResourceCountIcon } from "../../../constants/icons";
import { useFormState } from "react-final-form";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  ArrayInputStyles,
});

const FIXED_TAB_LABELS = ["Attributes", "Actors and creative team", "Terms of publication"];
const INPUT_ITEMS_PER_PAGE = 25;

export const Form: React.FC<FormProps> = ({ type, resource, ...props }) => {
  const classes = useStyles();
  const formState = useFormState();
  const history = useHistory();

  const goToParts = React.useCallback(() => {
    history.push(`/media_content/audio/audio_shows/${formState.values.id}/parts`);
  }, [history, formState]);

  return (
    <>
      <FormTabs labels={FIXED_TAB_LABELS}>
        {type !== "create" && (
          <StandardButton
            startIcon={<ResourceCountIcon color="var(--accent-color)" />}
            onClick={goToParts}
            variant="text"
            customColor="var(--accent-color)"
          >
            Parts ({formState.values.parts.length})
          </StandardButton>
        )}
      </FormTabs>
      <FormSection
        text="Attributes are used to visually represent the movie in the app and help the user make a choice.
          The more detailed the section is, the higher the probability of the movie getting into the search results and filtering in the application."
        title="Attributes"
        id="Attributes"
        formType={type}
      >
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          placeholder="name"
          fullWidth
          helperText={
            "The name of the audio show that users will see in any sections of the application"
          }
        />
        <TextInput
          resource={resource}
          inputType={type}
          label="Slug"
          source="slug"
          helperText={
            "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
          }
          fullWidth
        />
        <TextInput
          resource={resource}
          inputType={type}
          source="originalName"
          label="Original name"
          helperText={
            "The original non-localized title of the audio show, which users will see only in the description"
          }
          fullWidth
        />
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
        />
        <SelectInput
          resource={resource}
          choices={getYearsChoices()}
          label="Production year"
          inputType={type}
          source="productionYear"
        />
        <TextInput
          InputLabelProps={INPUT_LABEL_PROPS}
          resource={resource}
          parse={parseTimeInput}
          format={formatTimeInput}
          inputType={type}
          resettable={false}
          helperText="Specified in hours and minutes. If you leave the field empty, the duration will be filled in automatically after saving, provided that the video file is specified."
          label="Duration"
          source="duration"
          step="1"
          type="time"
          fullWidth
        />
        <TextInput
          InputLabelProps={INPUT_LABEL_PROPS}
          resource={resource}
          inputType={type}
          resettable={false}
          helperText={
            "Release date in the country where the application is used. If the release is upcoming, then the date is mandatory."
          }
          label="Release date"
          source="releaseDate"
          type="date"
          fullWidth
        />
        <ReferenceInput
          label="Languages"
          source="languagesIds"
          reference="languages"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            resource={resource}
            optionValue="id"
            inputType={type}
            helperText="The language of the movie's audio track. You can select multiple languages from the list."
          />
        </ReferenceInput>
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          inputType={type}
          resource={resource}
          query={ALL_GENRES}
          helperText="You can select several genres from the list"
          source="genreIds"
          label="Genres"
          idName="id"
        />
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          inputType={type}
          query={ALL_PRODUCTION_COUNTRIES}
          label="Production countries"
          source="productionCountriesIds"
          helperText="You can select several countries from the list"
          resource={resource}
          idName="id"
        />
        <ReferenceCustomInput
          component={SelectInput}
          query={ALL_RIGHT_HOLDERS}
          inputType={type}
          resource={resource}
          label="Right Holder"
          source="rightHolderId"
          idName="id"
          helperText="The company - the copyright holder of the audio show"
        />
        <ReferenceInput
          label="Studios"
          source="studioIds"
          reference="studios"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            inputType={type}
            resource={resource}
            helperText="A film production or rental company. You can select several studios from the list."
          />
        </ReferenceInput>
        <ReferenceInput
          label="External catalog"
          source="externalCatalogId"
          reference="external_catalog"
          resource={resource}
        >
          <SelectInput
            optionText="name"
            resource={resource}
            inputType={type}
            helperText="The partner directory from which the movie is imported. The logo of the external catalog will be displayed when previewing the movie in the app."
          />
        </ReferenceInput>
        <AutocompleteArrayInput
          source="markers"
          label="Label"
          inputType={type}
          choices={SELECT_MARKERS}
          helperText="The element that is displayed on top of the movie card in the application. If the film is to be released, the label will be ignored."
        />
        <NumberInput
          source="position"
          label="Position"
          resource={resource}
          inputType={type}
          helperText="The serial number in the general list of films. Can be entered manually when creating or editing, the positions of the remaining films will be updated accordingly. If the field is left empty, the last sequential number will be assigned to the movie."
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          helperText={
            "A pair of custom fields that can be used for filtering. You can add multiple pairs."
          }
          ChildComponent={MetaData}
          source="metadata"
          label="Metadata"
          groupInputs
          switchable
          fullWidth
        />
      </FormSection>
      <FormSection
        text="An ordered list of roles for participants in the creation of the film. You can add not only existing participants in the list, but also new ones, they will be automatically added to the general list."
        title="Actors and creative team"
        formType={type}
        id="Actors and creative team"
      >
        <ArrayInput
          source="castMembers"
          itemClass={classes.ArrayInputStyles}
          ChildComponent={CastMembers}
          resource={resource}
          inputType={type}
          query={ALL_ROLES}
          draggable
        />
      </FormSection>
      <FormSection
        id="Terms of publication"
        text="Configuration of the rule for publishing a movie. The rule will be automatically generated by the publishing system within one hour after saving. The generated rule will appear on the movie page in the current section."
        title="Terms of publication"
      >
        <RadioButtonGroupInput
          source="published"
          label="Publishing"
          initialValue={false}
          inputType={type}
          choices={PUBLISHED_CHOICES_FORM}
        />
        <RadioButtonGroupInput
          source="cmsDistribution"
          label="Distribution"
          inputType={type}
          choices={SELECT_DISTRIBUTION}
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          helperText={
            "The age rating of the film in accordance with the legislation of the country in which the application is used"
          }
          source="certificationRatings"
          label="Age rating"
          ChildComponent={RatingSystems}
          groupInputs
          switchable
          fullWidth
        />
        <CheckBoxGroup initialSourceState="allowedCountries">
          <ReferenceCustomInput
            component={AutocompleteArrayInput}
            inputType={type}
            query={ALL_COUNTRIES}
            resource={resource}
            source="allowedCountries"
            checkBoxLabel="Allowed Countries"
            helperText="The list of countries in which the film is available, access is prohibited for other countries. Leave the field empty if access is allowed for all countries."
            label=""
            idName="alpha2"
          />
          <ReferenceCustomInput
            component={AutocompleteArrayInput}
            inputType={type}
            query={ALL_COUNTRIES}
            resource={resource}
            checkBoxLabel="Disallowed countries"
            helperText="List of countries where the film is not available"
            label=""
            source="disallowedCountries"
            idName="alpha2"
          />
        </CheckBoxGroup>
        <CheckBoxGroup initialSourceState="allowedApiClients">
          <ReferenceInput
            label=""
            source="allowedApiClients"
            reference="api_clients"
            checkBoxLabel="Allowed api clients"
            resource={resource}
            perPage={INPUT_ITEMS_PER_PAGE}
          >
            <AutocompleteArrayInput
              optionText="name"
              inputType={type}
              helperText="The list of API clients for which access to the series is allowed, access is denied for other API clients. Leave the field empty if access is allowed for all API clients."
            />
          </ReferenceInput>
          <ReferenceInput
            label=""
            source="forbiddenApiClients"
            reference="api_clients"
            checkBoxLabel="Forbidden api clients"
            resource={resource}
            perPage={INPUT_ITEMS_PER_PAGE}
          >
            <AutocompleteArrayInput
              optionText="name"
              inputType={type}
              helperText="List of API clients for which access to the series is prohibited"
            />
          </ReferenceInput>
        </CheckBoxGroup>
      </FormSection>
      <ScrollTopButton />
    </>
  );
};