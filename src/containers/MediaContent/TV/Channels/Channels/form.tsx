import * as React from "react";
import { FormHelperText, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { FormProps } from "../../../../../types";
import {
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  NumberInput,
  requiredValidate,
  RichTextInput,
  SelectInput,
  TextInput,
} from "../../../../../components/Inputs";
import { SELECT_MARKERS } from "../../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { GroupInputsOrigin } from "../../../../../components/GroupInputs";
import { MetaData } from "../../../../../components/Models/Metadata";
import { FormSection } from "../../../../../components/FormSection";
import { ImageUploaderV2 } from "../../../../../components/ImageUploader";
import { FormTabs } from "../../../../../components/Tabs/form-tabs";
import { formHelperText } from "../../../../../components/Inputs/styles";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";

const useStyles = makeStyles({
  formHelperText: { ...formHelperText, marginTop: -16, marginBottom: 8 },
});

const INPUT_ITEMS_PER_PAGE = 25;
const IMAGE_REQUEST_VARS = { fieldName: "Channel" };
const FIXED_TAB_LABELS = ["Attributes", "Images", "Viewing Parameters"];
const SHIFT_CHOICES = [
  {
    id: "minutes",
    name: "minutes",
  },
  {
    id: "hours",
    name: "hours",
  },
  {
    id: "days",
    name: "days",
  },
  {
    id: "months",
    name: "months",
  },
  {
    id: "years",
    name: "years",
  },
];

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const classes = useStyles();

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
            "The name of the TV channel that users will see in any sections of the application"
          }
        />
        <TextInput
          resource={resource}
          inputType={type}
          label="Slug"
          source="slug"
          fullWidth
          helperText={
            "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
          }
        />
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
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
            helperText="The language of the sound track of the TV channel. You can select multiple languages from the list."
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
        <NumberInput
          source="position"
          label="Position"
          resource={resource}
          inputType={type}
          helperText="Serial number in the general list of TV channels. It can be entered manually when creating or editing, the positions of the other TV channels will be updated accordingly. If the field is left empty, the last serial number will be assigned to the TV channel."
        />
        <AutocompleteArrayInput
          source="markers"
          label="Label"
          inputType={type}
          choices={SELECT_MARKERS}
          helperText="The element that is displayed on top of the TV channel card in the application"
        />
        <TextInput
          resource={resource}
          inputType={type}
          label="Search keywords"
          source="searchKeywords"
          helperText="Allow you to effectively search for a TV channel in the application. You can select several words from the list or add a new one."
          fullWidth
        />
        <GroupInputsOrigin switchable inputType={type} label="Seo">
          <RichTextInput
            resource={resource}
            inputType={type}
            label="Synopsis"
            source="synopsis"
            helperText="A short description without HTML markup. Used only in the iOS app."
          />
          <RichTextInput
            resource={resource}
            inputType={type}
            label="Seo description"
            source="seoDescription"
            helperText="Search engine-optimized description that is used in the HTML markup of the page."
          />
          <TextInput
            label="Seo keywords"
            source="seoKeywords"
            inputType={type}
            helperText="Keywords optimized for search engines that are used in the HTML markup of the page. To separate words, use a comma with a space."
            fullWidth
          />
        </GroupInputsOrigin>
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          helperText="A pair of custom fields that can be used for filtering. You can add multiple pairs."
          ChildComponent={MetaData}
          source="metadata"
          label="Metadata"
          groupInputs
          switchable
          fullWidth
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
        text="Configurations of the rules for showing and viewing a TV channel"
        title="Viewing Parameters"
        formType={type}
        id="Viewing Parameters"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <NumberInput
              source="timeshiftAvailabilityValue"
              label="Time-shift"
              resource={resource}
              inputType={type}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectInput
              resource={resource}
              choices={SHIFT_CHOICES}
              label="Time-shift availability unit"
              inputType={type}
              source="timeshiftAvailabilityUnit"
            />
          </Grid>
        </Grid>
        <FormHelperText className={classes.formHelperText}>
          The amount of time back from the current one, by which you can rewind the live broadcast
          in the player back
        </FormHelperText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <NumberInput
              source="catchupAvailabilityValue"
              label="Catch-up"
              resource={resource}
              inputType={type}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectInput
              resource={resource}
              choices={SHIFT_CHOICES}
              label="Catch-up availability unit"
              inputType={type}
              source="catchupAvailabilityUnit"
            />
          </Grid>
        </Grid>
        <FormHelperText className={classes.formHelperText}>
          The amount of time back from the current one, during which recordings of past TV shows are
          available. In the application, in the section with the schedule, such TV shows will be
          marked with the corresponding icon.
        </FormHelperText>
        <NumberInput
          source="catchupOffset"
          label="Catch offset"
          resource={resource}
          inputType={type}
          helperText="The amount of time in seconds by which it is necessary to shift the start of the broadcast at the ketch-up to ensure an accurate hit at the beginning of the recorded telecast. The time shift can be adjusted both forward and backward."
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
