import * as React from "react";
import { FormProps } from "../../types";
import { FormTabs } from "../../components/Tabs/form-tabs";
import {
  ArrayInput,
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  getYearsChoices,
  NumberInput,
  requiredValidate,
  RichTextInput,
  SelectInput,
  TextInput,
} from "../../components/Inputs";
import { FormSection } from "../../components/FormSection";
import {
  EXTRA_VIDEO_TYPES,
  INPUT_LABEL_PROPS,
  SELECT_MARKERS,
} from "../../constants/forms-constants";
import { ReferenceCustomInput } from "../../components/Inputs/ReferenceInputs/reference-custom-input";
import {
  ALL_GENRES,
  ALL_PRODUCTION_COUNTRIES,
  ALL_RIGHT_HOLDERS,
  ALL_ROLES,
} from "../../components/Providers/custom-requests";
import { GroupInputsOrigin } from "../../components/GroupInputs";
import { MetaData } from "../../components/Models/Metadata";
import { CastMembers } from "../../components/Models/CastMembers/cast-members";
import { makeStyles } from "@material-ui/core";
import { ArrayInputStyles } from "../../components/Models/CastMembers/styles";
import { ImageUploaderV2 } from "../../components/ImageUploader";
import { Link } from "ra-ui-materialui";
import { ExtraVideos } from "../../components/Models/ExtraVideos";
import { RatingSystems } from "../../components/Models/RatingSytems";
import { ScrollTopButton } from "../../components/UI/Buttons/scroll-top-button";
import { useFormState } from "react-final-form";
import { alwaysEmptyString, scrollToErrorInput } from "../../helpers/form";
import { StandardButton } from "../../components/UI/Buttons/standard-button";
import { ResourceCountIcon } from "../../constants/icons";
import { useHistory } from "react-router-dom";
import { CheckBox } from "../../components/Inputs/Checkbox";

const useStyles = makeStyles((theme) => ({
  Link: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
  ArrayInputStyles,
}));

const FIXED_HEADER_OFFSET = 130;

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  const classes = useStyles();
  const formState = useFormState();
  const history = useHistory();

  const goToSeasons = React.useCallback(() => {
    if (formState.values && formState.values.id) {
      history.push(`/media_content/video/series/${formState.values.id}/seasons`);
    }
  }, [formState, history]);

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
      <FormTabs labels={["Attributes", "Actors and creative team", "Images", "Source"]}>
        {type !== "create" && (
          <StandardButton
            onClick={goToSeasons}
            startIcon={<ResourceCountIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
          >
            Seasons ({formState.values["seasons"].length})
          </StandardButton>
        )}
      </FormTabs>
      <FormSection
        text="Used for the visual content of the application"
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
          fullWidth
          helperText={
            "The name of the series that users will see in any sections of the application"
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
            "The original non-localized title of the series, which users will see only in the description"
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
          placeholder="гггг"
          inputType={type}
          source="productionYear"
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
          source="productionCountryIds"
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
          helperText="The company - the copyright holder of the film"
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
            helperText={
              "A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            }
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
        <CheckBox
          source="hasSeason"
          label="Number of seasons"
          checkboxLabel="More than one season"
          initialValue={false}
          helperText="
On the series page, users will see a menu with the numbering of seasons, the season number in the episode preview card and in the title on the player. If the series has only one season or it is a multi-part movie, you can deactivate the checkbox so that the application does not display information about the seasons."
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          getItemLabel={alwaysEmptyString}
          fullWidth
          helperText={
            "A pair of custom fields that can be used for filtering. You can add multiple pairs."
          }
          ChildComponent={MetaData}
          source="metadata"
          label="Metadata"
          groupInputs
          switchable
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
          getItemLabel={alwaysEmptyString}
          itemClass={classes.ArrayInputStyles}
          ChildComponent={CastMembers}
          resource={resource}
          query={ALL_ROLES}
          inputType={type}
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
          inputType={type}
          resource={resource}
          sourceIds="imageIds"
          source="images"
        />
      </FormSection>
      <FormSection
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
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          getItemLabel={alwaysEmptyString}
          fullWidth
          choices={EXTRA_VIDEO_TYPES}
          ChildComponent={ExtraVideos}
          source="extraVideos"
          label="Extra videos"
          groupInputs
          switchable
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          getItemLabel={alwaysEmptyString}
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
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
