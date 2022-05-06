import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import {
  TextInput,
  requiredValidate,
  NumberInput,
  ArrayInput,
  AutocompleteArrayInput,
  SelectInput,
  ArrayInputNoDrag,
  parseTimeInput,
  formatTimeInput,
  getYearsChoices,
  ReferenceInput,
  RichTextInput,
} from "../../../../components/Inputs";

import { FormProps } from "../../../../types";
import { GroupInputsOrigin } from "../../../../components/GroupInputs";
import { FormTabs } from "../../../../components/Tabs/form-tabs";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { ImageUploaderV2 } from "../../../../components/ImageUploader";
import {
  EXTRA_VIDEO_TYPES,
  INPUT_LABEL_PROPS,
  PUBLISHED_CHOICES_FORM,
  SELECT_DISTRIBUTION,
  SELECT_MARKERS,
} from "../../../../constants/forms-constants";
import { FormSection } from "../../../../components/FormSection";
import { ReferenceCustomInput } from "../../../../components/Inputs/ReferenceInputs/reference-custom-input";
import { ALL_COUNTRIES, ALL_ROLES } from "../../../../components/Providers/custom-requests";
import { CastMembers } from "../../../../components/Models/CastMembers";
import { Link } from "ra-ui-materialui";
import { ArrayInputStyles } from "../../../../components/Models/CastMembers/styles";
import { MetaData } from "../../../../components/Models/Metadata";
import { ExtraVideos } from "../../../../components/Models/ExtraVideos";
import { RatingSystems } from "../../../../components/Models/RatingSytems";
import { scrollToErrorInput } from "../../../../helpers/form";
import { CheckBoxGroup } from "../../../../components/UI/MaterialUI/check-box-group";
import { SwitchInput } from "../../../../components/Inputs/SwitchInput";
import { RadioButtonGroupInput } from "../../../../components/Inputs/RadioButtonGroupInput";
import { ReferenceArrayInput } from "../../../../components/Inputs/ReferenceInputs/reference-array-input";

const useStyles = makeStyles((theme) => ({
  Link: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
  ArrayInputStyles,
}));

const IMAGE_REQUEST_VARS = { fieldName: "Movie" };
const FIXED_HEADER_OFFSET = 130;
const INPUT_ITEMS_PER_PAGE = 25;
const FIXED_TAB_LABELS = [
  "Attributes",
  "Actors and creative team",
  "Images",
  "Source",
  "Advertisement",
  "Terms of publication",
];

export const Form: React.FC<FormProps> = React.memo(({ type, resource }) => {
  const classes = useStyles();
  const formState = useFormState();

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
      <FormTabs labels={FIXED_TAB_LABELS} />
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
            "The name of the movie that users will see in any sections of the application"
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
            "The original non-localized title of the movie, which users will see only in the description"
          }
          fullWidth
        />
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
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
        <ReferenceArrayInput
          label="Languages"
          source="languagesIds"
          reference="media_content/attributes/languages"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="The language of the movie's audio track. You can select multiple languages from the list."
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Genres"
          source="genreIds"
          reference="media_content/attributes/genres"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="You can select several genres from the list"
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Production countries"
          source="productionCountryIds"
          reference="production_countries"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="You can select several countries from the list"
          />
        </ReferenceArrayInput>
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
        <ReferenceInput
          label="Right Holder"
          source="rightHolderId"
          reference="media_content/attributes/providers/right_holders"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <SelectInput
            resource={resource}
            inputType={type}
            helperText="The company - the copyright holder of the film"
          />
        </ReferenceInput>
        <ReferenceArrayInput
          label="Studios"
          source="studioIds"
          reference="media_content/attributes/providers/studios"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            inputType={type}
            resource={resource}
            helperText="A film production or rental company. You can select several studios from the list."
          />
        </ReferenceArrayInput>
        <ReferenceInput
          label="External catalog"
          source="externalCatalogId"
          reference="media_content/attributes/providers/content_providers"
          resource={resource}
        >
          <SelectInput
            optionText="name"
            resource={resource}
            inputType={type}
            helperText="The partner directory from which the movie is imported. The logo of the external catalog will be displayed when previewing the movie in the app."
          />
        </ReferenceInput>
        <SelectInput
          resource={resource}
          choices={getYearsChoices()}
          label="Production year"
          inputType={type}
          source="productionYear"
        />
        <GroupInputsOrigin inputType={type} label="ID in the cinema database">
          <NumberInput
            resource={resource}
            inputType={type}
            helperText="A digital identifier in the Kinopoisk system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            source="kinopoiskId"
            label="Kinopoisk ID"
          />
          <NumberInput
            resource={resource}
            inputType={type}
            helperText="A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            source="imdbId"
            label="IMDB ID"
          />
        </GroupInputsOrigin>
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
        text="The images are used as a background or cover for the visual representation of the movie in the application and help the user make a choice. To make the background or cover look attractive, upload an image with an aspect ratio and a minimum resolution according to the selected type. If the image does not match the selected type, the receiver will process the image itself, which may cause visual appeal to be lost."
        title="Images"
        formType={type}
        id="Images"
      >
        <ImageUploaderV2
          requestVariables={IMAGE_REQUEST_VARS}
          inputType={type}
          resource={resource}
          sourceIds="imageIds"
          source="images"
        />
      </FormSection>
      <FormSection
        formType={type}
        text={[
          "A file with a video track that the user will see in the application when playing the movie or an additional video file for the movie. To add a video file to a movie, it must be successfully transcoded. You can check the transcoding status in the ",
          <Link to="/media_content/video/video_files" className={classes.Link}>
            Video files
          </Link>,
          " section.",
        ]}
        title="Source"
        id="Source"
      >
        <ReferenceArrayInput
          label="Video file"
          source="streamSourceIds"
          reference="media_content/video/video_files"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          validate={requiredValidate}
        >
          <AutocompleteArrayInput
            optionText="name"
            inputType={type}
            helperText="You can select several video files from the list, the first one will be used by default. If the video file is not in the list, make sure that it has been successfully transcoded in the Video files section"
          />
        </ReferenceArrayInput>
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          fullWidth
          choices={EXTRA_VIDEO_TYPES}
          ChildComponent={ExtraVideos}
          source="extraVideos"
          label="Extra videos"
          groupInputs
          switchable
        />
      </FormSection>
      <FormSection
        text="Settings for displaying ad blocks inside the video. Ads are available for showing to both anonymous users of the application and logged-in users who have not paid for a tariff plan with the disabling of advertising. Global ad display rules (ad server address, ad display period) are set at the level of the Rosing platform settings for a specific project outside the current admin panel."
        title="Advertisement"
        formType={type}
        id="Advertisement"
      >
        <GroupInputsOrigin
          label="Preroll"
          inputType={type}
          groupHelperText="Block of commercials at the beginning of the video, let's say one block"
        >
          <NumberInput inputType={type} source="preRollCount" label="Number of commercials" />
        </GroupInputsOrigin>
        <GroupInputsOrigin
          label="Midroll"
          inputType={type}
          groupHelperText="A block of commercials in the middle of the video, several blocks are allowed. The number of blocks depends on the offset time of their display and the duration of the video."
        >
          <NumberInput inputType={type} source="midRollCount" label="Number of commercials" />
          <NumberInput
            inputType={type}
            source="firstMidRollOffset"
            label="Showing the first midroll"
            helperText="Shift time of the first midroll in seconds from the beginning of the video"
          />
          <NumberInput
            inputType={type}
            source="nthMidRollOffset"
            label="Show subsequent midrolls"
            helperText="Time to shift the display of subsequent midrolls in seconds from the start of displaying the first midroll"
          />
        </GroupInputsOrigin>
        <SwitchInput
          label="Downloading a movie"
          source="downloadable"
          helperText="Download and play the movie offline, available in the app for Android and iOS"
          inputType={type}
          labelPlacement="start"
        />
        {formState.values.downloadable && (
          <GroupInputsOrigin inputType={type}>
            <NumberInput
              label="Storage time"
              helperText="The storage time of the downloaded movie in offline mode is calculated in days. By default, the storage time is 30 days."
              source="storageTime"
              inputType={type}
            />
          </GroupInputsOrigin>
        )}
      </FormSection>
      <FormSection
        id="Terms of publication"
        text="Configuration of the rule for publishing a movie. The rule will be automatically generated by the publishing system within one hour after saving. The generated rule will appear on the movie page in the current section."
        title="Terms of publication"
        formType={type}
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
          helperText="The age rating of the film in accordance with the legislation of the country in which the application is used"
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
          <ReferenceArrayInput
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
          </ReferenceArrayInput>
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
});

export default Form;
