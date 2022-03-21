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
  SelectInput,
  TextInput,
} from "../../components/Inputs";
import { FormSection } from "../../components/FormSection";
import { EXTRA_VIDEO_TYPES, INPUT_LABEL_PROPS } from "../../constants/forms-constants";
import { ReferenceCustomInput } from "../../components/Inputs/ReferenceInputs/reference-custom-input";
import {
  ALL_GENRES,
  ALL_PRODUCTION_COUNTRIES,
  ALL_RIGHT_HOLDERS,
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

const useStyles = makeStyles((theme) => ({
  Link: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
  ArrayInputStyles,
}));

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  const classes = useStyles();
  return (
    <>
      <FormTabs labels={["Attributes", "Actors and creative team", "Images", "Source"]} />
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
        <TextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
          resettable={false}
          fullWidth
          multiline
          rows={4}
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
          getItemLabel={() => ""}
          fullWidth
          helperText={
            "A pair of custom fields that can be used for filtering. You can add multiple pairs."
          }
          childcomponent={MetaData}
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
          getItemLabel={() => ""}
          itemClass={classes.ArrayInputStyles}
          childcomponent={CastMembers}
          resource={resource}
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
          getItemLabel={() => ""}
          fullWidth
          choices={EXTRA_VIDEO_TYPES}
          childcomponent={ExtraVideos}
          source="extraVideos"
          label="Extra videos"
          groupInputs
          switchable
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          getItemLabel={() => ""}
          helperText={
            "The age rating of the film in accordance with the legislation of the country in which the application is used"
          }
          source="certificationRatings"
          label="Age rating"
          childcomponent={RatingSystems}
          groupInputs
          switchable
          fullWidth
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
