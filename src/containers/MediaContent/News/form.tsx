import * as React from "react";
import { FormProps } from "../../../types";
import {
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  ReferenceInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../components/Inputs";
import { FormTabs } from "../../../components/Tabs/form-tabs";
import { FormSection } from "../../../components/FormSection";
import {
  PUBLISHED_CHOICES_FORM,
  SELECT_DISTRIBUTION,
  SELECT_MARKERS,
} from "../../../constants/forms-constants";
import { GroupInputsOrigin } from "../../../components/GroupInputs";
import { MetaData } from "../../../components/Models/Metadata";
import { ImageUploaderV2 } from "../../../components/ImageUploader";
import { RadioButtonGroupInput } from "../../../components/Inputs/RadioButtonGroupInput";
import { useFormState } from "react-final-form";
import { scrollToErrorInput } from "../../../helpers/form";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteInput } from "../../../components/Inputs/AutocompleteInput";

const FIXED_TAB_LABELS = ["Attributes", "Images", "Terms of publication"];
const INPUT_ITEMS_PER_PAGE = 25;
const FIXED_HEADER_OFFSET = 130;
const IMAGE_REQUEST_VARS = { fieldName: "News" };

export const Form: React.FC<FormProps> = ({ resource, type }) => {
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
          placeholder="Name"
          fullWidth
          helperText={"The name of the news that users will see in any sections of the application"}
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
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Body Template"
          source="bodyTemplate"
          validate={requiredValidate}
        />
        <RichTextInput resource={resource} inputType={type} label="Body text" source="bodyText" />
        <ReferenceInput
          label="Video file"
          source="streamSourceId"
          reference="media_content/video/video_files"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          allowEmpty
        >
          <AutocompleteInput
            fullWidth
            optionText="name"
            source="externalCatalogId"
            resource={resource}
            inputType={type}
            helperText="You can select several video files from the list, the first one will be used by default. If the video file is not in the list, make sure that it has been successfully transcoded in the Video files section"
          />
        </ReferenceInput>
        <ReferenceInput
          label="External catalog"
          source="externalCatalogId"
          reference="media_content/attributes/providers/content_providers"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          allowEmpty
        >
          <AutocompleteInput
            optionText="name"
            optionValue="id"
            source="externalCatalogId"
            resource={resource}
            inputType={type}
            helperText="The partner directory from which the movie is imported. The logo of the external catalog will be displayed when previewing the movie in the app."
            fullWidth
            resettable
          />
        </ReferenceInput>
        <AutocompleteArrayInput
          source="markers"
          label="Label"
          inputType={type}
          choices={SELECT_MARKERS}
          resource={resource}
          allowEmpty
          helperText="The element that is displayed on top of the movie card in the application. If the film is to be released, the label will be ignored."
        />
        <GroupInputsOrigin switchable inputType={type} label="Seo">
          <RichTextInput
            resource={resource}
            inputType={type}
            label="Seo title"
            source="seoTitle"
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
          inputType={type}
          requestVariables={IMAGE_REQUEST_VARS}
          resource={resource}
          sourceIds="imageIds"
          source="images"
        />
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
          resource={resource}
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};

export default Form;
