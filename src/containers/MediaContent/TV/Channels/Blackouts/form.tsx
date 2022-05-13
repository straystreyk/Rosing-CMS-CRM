import * as React from "react";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { DateTimeInput, ReferenceInput, RichTextInput } from "../../../../../components/Inputs";
import {
  CATCHUP_AVAILABLE,
  LIVE_AVAILABLE,
  PUBLISHED_CHOICES_FORM,
} from "../../../../../constants/forms-constants";
import { RadioButtonGroupInput } from "../../../../../components/Inputs/RadioButtonGroupInput";

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
      <DateTimeInput
        source="startAt"
        label="Starting"
        helperText="Date and time of the start of the restriction"
      />
      <DateTimeInput
        source="endAt"
        label="End at"
        helperText="DDate and time of the end of the current restriction"
      />
      <RadioButtonGroupInput
        source="catchupAvailable"
        label="Catchup available"
        helperText="Ketch-up is not available during the restriction period"
        choices={CATCHUP_AVAILABLE}
        inputType={type}
      />
      <RadioButtonGroupInput
        source="liveAvailable"
        label="Live available"
        helperText="During the period of the restriction, live streaming is not available"
        choices={LIVE_AVAILABLE}
        inputType={type}
      />
      <RichTextInput resource={resource} inputType={type} label="Message" source="message" />
      <ScrollTopButton />
    </>
  );
};
