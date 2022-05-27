import * as React from "react";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../../types";
import {
  ReferenceInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../../../components/Inputs";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";

const INPUT_ITEMS_PER_PAGE = 25;

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      {type === "show" && (
        <TextInput
          validate={requiredValidate}
          resource={resource}
          inputType={type}
          label="ID"
          source="id"
          fullWidth
          offFastEdit
        />
      )}
      <TextInput
        validate={requiredValidate}
        resource={resource}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
      />
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Description"
        source="description"
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
          source="epgSourceId"
          resource={resource}
          inputType={type}
          fullWidth
          helperText="If the EPG source is not in the list, you can add it manually in the EPG Sources section or by clicking the button below. It is necessary to know in advance the UID of the TV channel provided by the EPG provider."
        />
      </ReferenceInput>
      <ScrollTopButton />
    </>
  );
};
