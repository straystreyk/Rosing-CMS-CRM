import * as React from "react";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { ReferenceInput, RichTextInput } from "../../../../../components/Inputs";
import { DateTimeInput } from "ra-ui-materialui";

const INPUT_ITEMS_PER_PAGE = 25;

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      <ReferenceInput
        label="Channel version"
        source="channelVersionId"
        reference="media_content/tv/channels/channels/:channelId/channel_versions"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
      >
        <AutocompleteInput
          optionText="name"
          optionValue="id"
          resource={resource}
          inputType={type}
          fullWidth
          helperText="The language of the sound track of the TV channel. You can select multiple languages from the list."
        />
      </ReferenceInput>
      <DateTimeInput source="asd" />
      <RichTextInput resource={resource} inputType={type} label="Message" source="message" />
      <ScrollTopButton />
    </>
  );
};
