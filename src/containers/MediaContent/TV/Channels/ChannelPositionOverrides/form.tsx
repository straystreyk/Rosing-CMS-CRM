import * as React from "react";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { NumberInput, ReferenceInput, requiredValidate } from "../../../../../components/Inputs";

const INPUT_ITEMS_PER_PAGE = 25;

const REGION_CHOICES = [
  {
    id: "AD-05",
    name: "AD-05",
  },
  {
    id: "TJ-KT",
    name: "TJ-KT",
  },
  {
    id: "TJ-KT",
    name: "TJ-KT",
  },
];

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      <ReferenceInput
        label="TV channel"
        source="channelId"
        reference="media_content/tv/channels/channels"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
        validate={requiredValidate}
      >
        <AutocompleteInput
          optionText="name"
          optionValue="id"
          resource={resource}
          inputType={type}
          helperText={false}
          fullWidth
        />
      </ReferenceInput>
      <AutocompleteInput
        helperText="The geographical region in which the TV channel will be displayed in the general list of TV channels at the specified position"
        inputType={type}
        label="Region"
        source="regionUid"
        choices={REGION_CHOICES}
        resource={resource}
      />
      <NumberInput
        source="position"
        label="Position"
        resource={resource}
        inputType={type}
        validate={requiredValidate}
        helperText="The geographical region in which the TV channel will be displayed in the general list of TV channels at the specified position."
        fullWidth
      />
      <ScrollTopButton />
    </>
  );
};
