import * as React from "react";
import { makeStyles } from "@material-ui/core";
import {
  TextInput,
  requiredValidate,
  NumberInput,
  ArrayInput,
  AutocompleteArrayInput,
  ReferenceInput,
  SelectInput,
  ArrayInputNoDrag,
  parseTimeInput,
  formatTimeInput,
  getYearsChoices,
} from "../../components/Inputs";

import { FormProps } from "../../types";
import { GroupInputs } from "../../components/GroupInputs";
import { FormTabs } from "../../components/Tabs/form-tabs";
import { ScrollTopButton } from "../../components/UI/Buttons/scroll-top-button";
import { ImageUploaderV2 } from "../../components/ImageUploader";
import { INPUT_LABEL_PROPS } from "../../constants/forms-constants";
import { FormSection } from "../../components/FormSection";
import { ReferenceCustomInput } from "../../components/Inputs/reference-custom-input";
import { ALL_COUNTRIES } from "../../components/Providers/custom-requests";

const useStyles = makeStyles({
  CastMembers: {
    border: "1px dashed #9FA5A8",
    borderRadius: 4,
    padding: "12px 24px",
    backgroundColor: "#fff",
  },
});

const CastMembers: React.FC<{
  parentSource?: string;
  resource: string;
}> = React.memo(({ parentSource, resource }) => {
  return (
    <>
      <TextInput source={`${parentSource}.characterName`} label="Character name" fullWidth />
      <ReferenceInput label="Person" source={`${parentSource}.personId`} reference="people">
        <SelectInput optionText="fullName" resource={resource} />
      </ReferenceInput>
      <GroupInputs label="ID in the cinema database">
        <NumberInput
          source={`${parentSource}.kinopoiskId`}
          label="Kinopoisk ID"
          helperText={
            "A digital identifier in the Kinopoisk system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
          }
        />
        <NumberInput
          source={`${parentSource}.imdbId`}
          label="IMDB ID"
          helperText={
            "A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
          }
        />
      </GroupInputs>
      <TextInput
        source={`${parentSource}.position`}
        style={{ display: "none" }}
        label=""
        fullWidth
      />
      <TextInput source={`${parentSource}.id`} style={{ display: "none" }} label="" fullWidth />
      <NumberInput
        source={`${parentSource}.role`}
        style={{ display: "none" }}
        label="Role"
        initialValue={1}
        fullWidth
      />
      <TextInput
        source={`${parentSource}.playableType`}
        label=""
        style={{ display: "none" }}
        initialValue="Content::Movie"
      />
    </>
  );
});

export const Form: React.FC<FormProps> = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <FormTabs
        labels={[
          "Attributes",
          "Actors and creative team",
          "Images",
          "Video files",
          "Advertisement",
        ]}
      />
      <FormSection
        text="Attributes are used to visually represent the movie in the app and help the user make a choice.
          The more detailed the section is, the higher the probability of the movie getting into the search results and filtering in the application."
        title="Attributes"
        id="Attributes"
        formType={props.type}
      >
        <TextInput
          resource={props.resource}
          validate={requiredValidate}
          inputType={props.type}
          source="name"
          fullWidth
          helperText={
            "The name of the movie that users will see in any sections of the application"
          }
        />
        <TextInput
          resource={props.resource}
          inputType={props.type}
          source="originalName"
          helperText={
            "The original non-localized title of the movie, which users will see only in the description"
          }
          fullWidth
        />
        <TextInput
          resource={props.resource}
          inputType={props.type}
          source="slug"
          helperText={
            "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
          }
          fullWidth
        />
        <TextInput
          resource={props.resource}
          inputType={props.type}
          source="description"
          fullWidth
          multiline
          rows={4}
        />
        <TextInput
          InputLabelProps={INPUT_LABEL_PROPS}
          resource={props.resource}
          inputType={props.type}
          resettable={false}
          source="releaseDate"
          type="date"
          fullWidth
        />
        <ReferenceInput source="genres" reference="genres">
          <AutocompleteArrayInput
            helperText="You can select several genres from the list"
            optionText="name"
          />
        </ReferenceInput>
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          source="allowedCountries"
          query={ALL_COUNTRIES}
          idName="alpha2"
        />
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          source="disallowedCountries"
          query={ALL_COUNTRIES}
          idName="alpha2"
        />
        <TextInput
          InputLabelProps={INPUT_LABEL_PROPS}
          resource={props.resource}
          parse={parseTimeInput}
          format={formatTimeInput}
          inputType={props.type}
          resettable={false}
          source="duration"
          type="time"
          fullWidth
        />
        <SelectInput
          resource={props.resource}
          choices={getYearsChoices()}
          source="productionYear"
        />
        <GroupInputs label="ID in the cinema database">
          <NumberInput
            resource={props.resource}
            helperText={
              "A digital identifier in the Kinopoisk system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            }
            source="kinopoiskId"
            label="Kinopoisk ID"
          />
          <NumberInput
            resource={props.resource}
            helperText={
              "A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            }
            source="imdbId"
            label="IMDB ID"
          />
        </GroupInputs>
        <ArrayInputNoDrag
          resource={props.resource}
          formType={props.type}
          getItemLabel={() => ""}
          helperText={
            "A pair of custom fields that can be used for filtering. You can add multiple pairs."
          }
          source="metadata"
          label="Metadata"
          groupInputs
          switchable
        >
          <TextInput
            label="Key"
            source="key"
            fullWidth
            inputType={props.type}
            validate={requiredValidate}
          />
          <TextInput
            label="Value"
            source="value"
            fullWidth
            inputType={props.type}
            validate={requiredValidate}
          />
        </ArrayInputNoDrag>
      </FormSection>
      <FormSection
        text="An ordered list of roles for participants in the creation of the film. You can add not only existing participants in the list, but also new ones, they will be automatically added to the general list."
        title="Actors and creative team"
        formType={props.type}
        id="Actors and creative team"
      >
        <ArrayInput
          source="castMembers"
          resource={props.resource}
          formType={props.type}
          getItemLabel={() => ""}
          addReorder
          draggable
          itemClass={classes.CastMembers}
          childcomponent={CastMembers}
        />
      </FormSection>
      <FormSection
        text="The images are used as a background or cover for the visual representation of the movie in the application and help the user make a choice. To make the background or cover look attractive, upload an image with an aspect ratio and a minimum resolution according to the selected type. If the image does not match the selected type, the receiver will process the image itself, which may cause visual appeal to be lost."
        title="Images"
        formType={props.type}
        id="Images"
      >
        <ImageUploaderV2 resource={props.resource} />
      </FormSection>
      <FormSection
        text="A file with a video track that the user will see in the application when playing the movie or an additional video file for the movie. To add a video file to a movie, it must be successfully transcoded. You can check the transcoding status in the <a>Video</a> files section."
        title="Video files"
        id="Video files"
      >
        <ReferenceInput
          reference="media_content/video_files"
          source="streamSourceIds"
          label={"Video file"}
        >
          <AutocompleteArrayInput
            optionText="name"
            resource={props.resource}
            validate={requiredValidate}
            helperText={
              "You can select several video files from the list, the first one will be used by default"
            }
          />
        </ReferenceInput>
      </FormSection>
      <FormSection
        text="Settings for displaying ad blocks inside the video. Ads are available for showing to both anonymous users of the application and logged-in users who have not paid for a tariff plan with the disabling of advertising. Global ad display rules (ad server address, ad display period) are set at the level of the Rosing platform settings for a specific project outside the current admin panel."
        title="Advertisement"
        formType={props.type}
        id="Advertisement"
      >
        <GroupInputs
          label="Preroll"
          groupHelperText="Block of commercials at the beginning of the video, let's say one block"
        >
          <NumberInput source="preRollCount" label="Number of commercials" />
        </GroupInputs>
        <GroupInputs
          label="Midroll"
          groupHelperText="A block of commercials in the middle of the video, several blocks are allowed. The number of blocks depends on the offset time of their display and the duration of the video."
        >
          <NumberInput source="midRollCount" label="Number of commercials" />
          <NumberInput
            source="firstMidRollOffset"
            label="Showing the first midroll"
            helperText="Shift time of the first midroll in seconds from the beginning of the video"
          />
          <NumberInput
            source="nthMidRollOffset"
            label="Show subsequent midrolls"
            helperText="Time to shift the display of subsequent midrolls in seconds from the start of displaying the first midroll"
          />
        </GroupInputs>
      </FormSection>
      <ScrollTopButton />
    </>
  );
};

export default Form;
