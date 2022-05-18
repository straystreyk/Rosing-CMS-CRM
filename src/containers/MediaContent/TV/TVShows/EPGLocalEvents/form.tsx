import * as React from "react";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import {
  ArrayInputNoDrag,
  DateTimeInput,
  ReferenceInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../../../components/Inputs";
import { ImageUploaderV2 } from "../../../../../components/ImageUploader";
import { RatingSystems } from "../../../../../components/Models/RatingSytems";

const INPUT_ITEMS_PER_PAGE = 25;
const IMAGE_REQUEST_VARS = { fieldName: "EpgLocalEvent" };

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      {type === "show" && (
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="ID"
          source="id"
          offFastEdit
          fullWidth
        />
      )}
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
      />
      <ReferenceInput
        label="EPG source"
        source="epgSourceId"
        reference="media_content/tv/tv_shows/epg_sources"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
        validate={requiredValidate}
        allowEmpty
      >
        <AutocompleteInput
          optionText="name"
          optionValue="id"
          resource={resource}
          inputType={type}
          fullWidth
          helperText="If the EPG source is not in the list, you can add it manually in the EPG Sources section or by clicking the button below. It is necessary to know in advance the UID of the TV channel provided by the EPG provider."
        />
      </ReferenceInput>
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Description"
        source="description"
      />
      <DateTimeInput
        source="startAt"
        label="Starting"
        resource={resource}
        inputType={type}
        helperText="Date and time of the start of the restriction"
      />
      <DateTimeInput
        source="endAt"
        label="End at"
        resource={resource}
        inputType={type}
        helperText="Date and time of the end of the current restriction"
      />
      <ImageUploaderV2
        inputType={type}
        requestVariables={IMAGE_REQUEST_VARS}
        resource={resource}
        sourceIds="imageIds"
        source="images"
        offInfo
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
      <ScrollTopButton />
    </>
  );
};
